export type Language = 'pt' | 'en';

export type DifficultyLevel = 'balanced' | 'tactical' | 'mastermind';

export type VotingMode = 'group' | 'individual';

export type QuestionTag = 'psychological' | 'dilemma' | 'scenario' | 'bluff';

export interface LocalizedText {
  pt: string;
  en: string;
}

export interface Player {
  id: string;
  name: string;
  color: string; // Tailwind class background
  textColor: string;
  emoji: string;
}

export interface WordItem {
  word: LocalizedText;
  hint: LocalizedText;
  difficulty: DifficultyLevel;
}

export interface Category {
  id: string;
  name: LocalizedText;
  icon: string;
  desc: LocalizedText;
  color: string;
  accentColor: string;
  words: WordItem[];
}

export interface StrategicQuestion {
  id: string;
  text: LocalizedText;
  tag: QuestionTag;
  difficulty: DifficultyLevel;
  categories?: string[];
}

export interface TwistModifier {
  id: string;
  title: LocalizedText;
  desc: LocalizedText;
  icon: string;
}

export interface GameSettings {
  impostorCount: number;
  timeMinutes: number;
  language: Language;
  difficulty: DifficultyLevel;
  votingMode: VotingMode;
  enableTwists: boolean;
}

export interface GameData {
  categoryId: string;
  categoryName: LocalizedText;
  secretWord: LocalizedText;
  secretHint: LocalizedText;
  difficulty: DifficultyLevel;
  impostors: string[]; // List of Player IDs
  twist: TwistModifier | null;
  questions: StrategicQuestion[];
}

export interface RoundOutcome {
  status: 'full_victory' | 'partial_victory' | 'defeat';
  accusedIds: string[];
  caughtImpostorIds: string[];
  missedImpostorIds: string[];
  wronglyAccusedIds: string[];
  voteCounts: Record<string, number>;
  totalBallots: number;
  votingMode: VotingMode;
}

export type ScreenType =
  | 'home'
  | 'players'
  | 'settings'
  | 'categories'
  | 'pass'
  | 'reveal'
  | 'timer'
  | 'voting'
  | 'result';
