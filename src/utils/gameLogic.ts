import { CATEGORIES } from '../data/categories';
import { STRATEGIC_QUESTIONS, ROUND_TWISTS } from '../data/questions';
import {
  DifficultyLevel,
  GameData,
  GameSettings,
  Player,
  RoundOutcome,
  StrategicQuestion,
  TwistModifier,
  VotingMode,
  WordItem
} from '../types';

export function shuffleArray<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getMaxImpostors(playerCount: number): number {
  return playerCount >= 5 ? 2 : 1;
}

export function clampSettingsForPlayers(settings: GameSettings, playerCount: number): GameSettings {
  const maxImp = getMaxImpostors(playerCount);
  if (settings.impostorCount > maxImp) {
    return { ...settings, impostorCount: maxImp };
  }
  if (settings.impostorCount < 1) {
    return { ...settings, impostorCount: 1 };
  }
  return settings;
}

export function assignImpostors(
  players: Player[],
  requestedCount: number,
  rng: () => number = Math.random
): string[] {
  if (players.length < 3) return [];
  const maxAllowed = getMaxImpostors(players.length);
  const actualCount = Math.max(1, Math.min(requestedCount, maxAllowed));
  const shuffled = shuffleArray(players, rng);
  return shuffled.slice(0, actualCount).map((p) => p.id);
}

export function pickWordForRound(
  categoryId: string | 'random',
  difficulty: DifficultyLevel,
  recentlyUsedWords: string[] = [],
  rng: () => number = Math.random
): { categoryId: string; wordItem: WordItem } {
  const categoryKeys = Object.keys(CATEGORIES);
  const resolvedCategoryId =
    categoryId === 'random' || !CATEGORIES[categoryId]
      ? categoryKeys[Math.floor(rng() * categoryKeys.length)]
      : categoryId;

  const category = CATEGORIES[resolvedCategoryId];

  // Match requested difficulty (balanced includes balanced+tactical, tactical includes tactical+mastermind, mastermind focuses on mastermind+tactical)
  let pool = category.words.filter((w) => {
    if (difficulty === 'balanced') return w.difficulty === 'balanced' || w.difficulty === 'tactical';
    if (difficulty === 'tactical') return w.difficulty === 'tactical' || w.difficulty === 'mastermind';
    return w.difficulty === 'mastermind';
  });

  if (pool.length === 0) {
    pool = category.words;
  }

  // Filter out recently used words if fresh ones remain
  const freshPool = pool.filter((w) => !recentlyUsedWords.includes(w.word.pt));
  const finalPool = freshPool.length > 0 ? freshPool : pool;

  const chosen = finalPool[Math.floor(rng() * finalPool.length)];
  return { categoryId: resolvedCategoryId, wordItem: chosen };
}

export function pickQuestionsForRound(
  categoryId: string,
  difficulty: DifficultyLevel,
  count: number = 12,
  rng: () => number = Math.random
): StrategicQuestion[] {
  const categoryMatched = STRATEGIC_QUESTIONS.filter(
    (q) => q.categories && q.categories.includes(categoryId)
  );
  const difficultyMatched = STRATEGIC_QUESTIONS.filter(
    (q) => (!q.categories || q.categories.includes(categoryId)) && q.difficulty === difficulty
  );
  const others = STRATEGIC_QUESTIONS.filter(
    (q) => !difficultyMatched.includes(q) && !categoryMatched.includes(q)
  );

  const ordered = [
    ...shuffleArray(categoryMatched, rng),
    ...shuffleArray(difficultyMatched, rng),
    ...shuffleArray(others, rng)
  ];

  // Deduplicate while preserving priority order
  const seen = new Set<string>();
  const unique: StrategicQuestion[] = [];
  for (const q of ordered) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      unique.push(q);
    }
    if (unique.length >= count) break;
  }

  return unique;
}

export function pickRoundTwist(
  enableTwists: boolean,
  rng: () => number = Math.random
): TwistModifier | null {
  if (!enableTwists || ROUND_TWISTS.length === 0) return null;
  return ROUND_TWISTS[Math.floor(rng() * ROUND_TWISTS.length)];
}

export function createRoundData(
  players: Player[],
  categoryId: string | 'random',
  settings: GameSettings,
  recentlyUsedWords: string[] = [],
  rng: () => number = Math.random
): GameData {
  const { categoryId: resolvedCatId, wordItem } = pickWordForRound(
    categoryId,
    settings.difficulty,
    recentlyUsedWords,
    rng
  );
  const category = CATEGORIES[resolvedCatId];
  const impostors = assignImpostors(players, settings.impostorCount, rng);
  const questions = pickQuestionsForRound(resolvedCatId, settings.difficulty, 14, rng);
  const twist = pickRoundTwist(settings.enableTwists, rng);

  return {
    categoryId: resolvedCatId,
    categoryName: category.name,
    secretWord: wordItem.word,
    secretHint: wordItem.hint,
    difficulty: wordItem.difficulty,
    impostors,
    twist,
    questions
  };
}

export interface VoteSelectionUpdate {
  nextSelection: string[];
  reason: 'added' | 'removed' | 'replaced' | 'limit_reached';
}

/**
 * Updates a voter's selected suspect list while strictly preventing duplicate selections
 * and enforcing exact vote limits (1 for 1 impostor, 2 distinct suspects for 2 impostors).
 */
export function toggleVoteSelection(
  currentSelection: string[],
  targetId: string,
  requiredVotes: number
): VoteSelectionUpdate {
  // Deselect if already chosen (prevents duplicate selection)
  if (currentSelection.includes(targetId)) {
    return {
      nextSelection: currentSelection.filter((id) => id !== targetId),
      reason: 'removed'
    };
  }

  // When only 1 vote is required, tapping another candidate smoothly switches to them
  if (requiredVotes === 1) {
    return {
      nextSelection: [targetId],
      reason: currentSelection.length === 1 ? 'replaced' : 'added'
    };
  }

  // When 2 votes are required, allow up to 2 distinct players; block 3rd until user deselects one
  if (currentSelection.length < requiredVotes) {
    return {
      nextSelection: [...currentSelection, targetId],
      reason: 'added'
    };
  }

  return {
    nextSelection: currentSelection,
    reason: 'limit_reached'
  };
}

/**
 * Validates that a ballot has the exact number of required votes, no duplicates,
 * and only valid player IDs.
 */
export function isVoteSelectionValid(
  selection: string[],
  requiredVotes: number,
  validPlayerIds: string[]
): boolean {
  if (requiredVotes < 1) return false;
  if (selection.length !== requiredVotes) return false;
  const unique = new Set(selection);
  if (unique.size !== requiredVotes) return false;
  const validSet = new Set(validPlayerIds);
  return selection.every((id) => validSet.has(id));
}

export interface IndividualTallyResult {
  voteCounts: Record<string, number>;
  rankedPlayerIds: string[];
  guaranteedAccusedIds: string[];
  tiedCandidateIds: string[];
  needsTieBreak: boolean;
  slotsRemainingToFill: number;
}

/**
 * Tallies all individual player ballots and determines top accused suspects,
 * flagging ties at the cutoff boundary cleanly.
 */
export function tallyIndividualBallots(
  ballots: Record<string, string[]>,
  players: Player[],
  requiredAccusedCount: number
): IndividualTallyResult {
  const voteCounts: Record<string, number> = {};
  for (const p of players) {
    voteCounts[p.id] = 0;
  }

  const validPlayerIds = players.map((p) => p.id);

  Object.values(ballots).forEach((ballot) => {
    if (!isVoteSelectionValid(ballot, requiredAccusedCount, validPlayerIds)) {
      return;
    }
    for (const suspectId of ballot) {
      voteCounts[suspectId] = (voteCounts[suspectId] || 0) + 1;
    }
  });

  const rankedPlayerIds = [...players]
    .sort((a, b) => (voteCounts[b.id] || 0) - (voteCounts[a.id] || 0))
    .map((p) => p.id);

  if (rankedPlayerIds.length <= requiredAccusedCount) {
    return {
      voteCounts,
      rankedPlayerIds,
      guaranteedAccusedIds: rankedPlayerIds,
      tiedCandidateIds: [],
      needsTieBreak: false,
      slotsRemainingToFill: 0
    };
  }

  const cutoffScore = voteCounts[rankedPlayerIds[requiredAccusedCount - 1]] || 0;
  const nextScore = voteCounts[rankedPlayerIds[requiredAccusedCount]] || 0;

  if (cutoffScore === nextScore) {
    const guaranteedAccusedIds = rankedPlayerIds.filter((id) => (voteCounts[id] || 0) > cutoffScore);
    const tiedCandidateIds = rankedPlayerIds.filter((id) => (voteCounts[id] || 0) === cutoffScore);
    const slotsRemainingToFill = requiredAccusedCount - guaranteedAccusedIds.length;

    return {
      voteCounts,
      rankedPlayerIds,
      guaranteedAccusedIds,
      tiedCandidateIds,
      needsTieBreak: slotsRemainingToFill > 0 && tiedCandidateIds.length > slotsRemainingToFill,
      slotsRemainingToFill
    };
  }

  return {
    voteCounts,
    rankedPlayerIds,
    guaranteedAccusedIds: rankedPlayerIds.slice(0, requiredAccusedCount),
    tiedCandidateIds: [],
    needsTieBreak: false,
    slotsRemainingToFill: 0
  };
}

/**
 * Evaluates the final round outcome for both 1-impostor and 2-impostor matches.
 */
export function evaluateRoundOutcome(
  accusedIds: string[],
  impostorIds: string[],
  voteCounts: Record<string, number>,
  totalBallots: number,
  votingMode: VotingMode
): RoundOutcome {
  const uniqueAccused = Array.from(new Set(accusedIds));
  const caughtImpostorIds = impostorIds.filter((id) => uniqueAccused.includes(id));
  const missedImpostorIds = impostorIds.filter((id) => !uniqueAccused.includes(id));
  const wronglyAccusedIds = uniqueAccused.filter((id) => !impostorIds.includes(id));

  let status: RoundOutcome['status'] = 'defeat';
  if (caughtImpostorIds.length === impostorIds.length && impostorIds.length > 0) {
    status = 'full_victory';
  } else if (caughtImpostorIds.length > 0) {
    status = 'partial_victory';
  }

  return {
    status,
    accusedIds: uniqueAccused,
    caughtImpostorIds,
    missedImpostorIds,
    wronglyAccusedIds,
    voteCounts,
    totalBallots,
    votingMode
  };
}
