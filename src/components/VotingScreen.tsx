import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  Check,
  Lock,
  ShieldAlert,
  UserCheck,
  Users,
  Vote,
  X
} from 'lucide-react';
import { Language, Player, RoundOutcome, VotingMode } from '../types';
import {
  evaluateRoundOutcome,
  isVoteSelectionValid,
  tallyIndividualBallots,
  toggleVoteSelection
} from '../utils/gameLogic';
import { playDelete, playTap, playVoteSelect } from '../utils/audio';

interface VotingScreenProps {
  players: Player[];
  impostorIds: string[];
  votingMode: VotingMode;
  lang: Language;
  onChangeVotingMode: (mode: VotingMode) => void;
  onCompleteVoting: (outcome: RoundOutcome) => void;
}

export default function VotingScreen({
  players,
  impostorIds,
  votingMode,
  lang,
  onChangeVotingMode,
  onCompleteVoting
}: VotingScreenProps) {
  // Always base required votes on the actual active match impostor count (1 or 2)
  const requiredVotes = Math.max(1, Math.min(2, impostorIds.length));

  // Shared selection state for current ballot (group vote OR current individual voter OR tie-break)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [limitWarning, setLimitWarning] = useState<boolean>(false);

  // Individual secret voting flow state
  const [voterIndex, setVoterIndex] = useState<number>(0);
  const [ballotUnlocked, setBallotUnlocked] = useState<boolean>(false);
  const [ballots, setBallots] = useState<Record<string, string[]>>({});

  // Tie-break state (only triggered in individual mode if cutoff ties)
  const [tieBreakState, setTieBreakState] = useState<{
    guaranteedAccusedIds: string[];
    tiedCandidateIds: string[];
    slotsRemainingToFill: number;
    voteCounts: Record<string, number>;
    totalBallots: number;
  } | null>(null);

  const hasAnyCastBallot = Object.keys(ballots).length > 0 || tieBreakState !== null;

  // Reset local selection when switching mode before ballots start
  useEffect(() => {
    setSelectedIds([]);
    setLimitWarning(false);
    setVoterIndex(0);
    setBallotUnlocked(false);
    setBallots({});
    setTieBreakState(null);
  }, [votingMode]);

  useEffect(() => {
    if (!limitWarning) return;
    const timer = setTimeout(() => setLimitWarning(false), 2200);
    return () => clearTimeout(timer);
  }, [limitWarning]);

  const currentVoter = votingMode === 'individual' ? players[voterIndex] : null;

  // Candidates allowed for current step
  const availableCandidateIds = tieBreakState
    ? tieBreakState.tiedCandidateIds
    : votingMode === 'individual' && currentVoter
      ? players.filter((p) => p.id !== currentVoter.id).map((p) => p.id)
      : players.map((p) => p.id);

  const activeRequiredVotes = tieBreakState ? tieBreakState.slotsRemainingToFill : requiredVotes;

  const isSelectionComplete = isVoteSelectionValid(
    selectedIds,
    activeRequiredVotes,
    availableCandidateIds
  );

  const handleToggleCandidate = (candidateId: string) => {
    // Disallow self-vote in individual mode or non-tied players in tie-break
    if (!availableCandidateIds.includes(candidateId)) return;

    const result = toggleVoteSelection(selectedIds, candidateId, activeRequiredVotes);
    if (result.reason === 'limit_reached') {
      playDelete();
      setLimitWarning(true);
      return;
    }

    setLimitWarning(false);
    if (result.reason === 'removed') {
      playTap();
    } else {
      playVoteSelect();
    }
    setSelectedIds(result.nextSelection);
  };

  const handleConfirmCurrentVote = () => {
    if (!isSelectionComplete) return;
    playTap();

    // Case 1: Tie-break resolution
    if (tieBreakState) {
      const finalAccused = [...tieBreakState.guaranteedAccusedIds, ...selectedIds];
      const outcome = evaluateRoundOutcome(
        finalAccused,
        impostorIds,
        tieBreakState.voteCounts,
        tieBreakState.totalBallots,
        'individual'
      );
      onCompleteVoting(outcome);
      return;
    }

    // Case 2: Group consensus voting
    if (votingMode === 'group') {
      const voteCounts: Record<string, number> = {};
      for (const p of players) {
        voteCounts[p.id] = selectedIds.includes(p.id) ? 1 : 0;
      }
      const outcome = evaluateRoundOutcome(selectedIds, impostorIds, voteCounts, 1, 'group');
      onCompleteVoting(outcome);
      return;
    }

    // Case 3: Individual secret ballot
    if (!currentVoter) return;
    const updatedBallots = {
      ...ballots,
      [currentVoter.id]: selectedIds
    };

    if (voterIndex < players.length - 1) {
      setBallots(updatedBallots);
      setSelectedIds([]);
      setLimitWarning(false);
      setBallotUnlocked(false);
      setVoterIndex((prev) => prev + 1);
      return;
    }

    // All players have voted — tally results!
    const tally = tallyIndividualBallots(updatedBallots, players, requiredVotes);

    if (tally.needsTieBreak) {
      setBallots(updatedBallots);
      setSelectedIds([]);
      setLimitWarning(false);
      setTieBreakState({
        guaranteedAccusedIds: tally.guaranteedAccusedIds,
        tiedCandidateIds: tally.tiedCandidateIds,
        slotsRemainingToFill: tally.slotsRemainingToFill,
        voteCounts: tally.voteCounts,
        totalBallots: players.length
      });
      return;
    }

    const outcome = evaluateRoundOutcome(
      tally.guaranteedAccusedIds,
      impostorIds,
      tally.voteCounts,
      players.length,
      'individual'
    );
    onCompleteVoting(outcome);
  };

  const t = {
    pt: {
      title: 'HORA DA VOTAÇÃO',
      groupSub:
        requiredVotes === 2
          ? '2 impostores ativos: escolham 2 suspeitos diferentes'
          : 'Escolham quem é o principal suspeito da mesa',
      indSub:
        requiredVotes === 2
          ? 'Cada jogador vota em segredo em 2 suspeitos diferentes'
          : 'Cada jogador vota em segredo no seu principal suspeito',
      modeGroup: 'Mesa (Rápida)',
      modeIndividual: 'Secreta (Individual)',
      pickTwoAlert: `Selecione exatamente ${activeRequiredVotes} suspeitos diferentes`,
      pickOneAlert: 'Selecione 1 suspeito para acusar',
      limitMsg: `Você já selecionou ${activeRequiredVotes}. Toque em um marcado para trocar.`,
      slotLabel: (idx: number) => `${idx + 1}º Suspeito`,
      emptySlot: 'Aguardando escolha',
      selectedBadge: (idx: number) => `${idx + 1}º`,
      youBadge: 'Você',
      confirmGroup:
        requiredVotes === 2
          ? `CONFIRMAR 2 SUSPEITOS (${selectedIds.length}/2)`
          : `CONFIRMAR ACUSAÇÃO (${selectedIds.length}/1)`,
      confirmIndividual:
        voterIndex < players.length - 1
          ? `CONFIRMAR VOTO (${selectedIds.length}/${activeRequiredVotes})`
          : `FINALIZAR E APURAR (${selectedIds.length}/${activeRequiredVotes})`,
      passVoterTitle: 'CÉDULA SECRETA DE VOTAÇÃO',
      passVoterTo: 'Passe o aparelho para',
      unlockBallotBtn: 'ABRIR MINHA CÉDULA',
      voterProgress: `Eleitor ${voterIndex + 1} de ${players.length}`,
      tieTitle: 'DESEMPATE DA MESA',
      tieDesc: (slots: number) =>
        `Houve empate na apuração! Escolham ${slots === 1 ? '1 suspeito final' : `${slots} suspeitos finais`} entre os empatados.`,
      tieConfirm: (slots: number) =>
        `CONFIRMAR DESEMPATE (${selectedIds.length}/${slots})`
    },
    en: {
      title: 'FINAL VOTE',
      groupSub:
        requiredVotes === 2
          ? '2 impostors active: pick 2 different suspects'
          : 'Choose the group’s prime suspect',
      indSub:
        requiredVotes === 2
          ? 'Each player secretly votes for 2 different suspects'
          : 'Each player secretly votes for 1 suspect',
      modeGroup: 'Table (Quick)',
      modeIndividual: 'Secret (Individual)',
      pickTwoAlert: `Select ${activeRequiredVotes} different suspects`,
      pickOneAlert: 'Select 1 suspect to accuse',
      limitMsg: `Already selected ${activeRequiredVotes}. Tap a marked player to swap.`,
      slotLabel: (idx: number) => `Suspect #${idx + 1}`,
      emptySlot: 'Tap a player',
      selectedBadge: (idx: number) => `#${idx + 1}`,
      youBadge: 'You',
      confirmGroup:
        requiredVotes === 2
          ? `CONFIRM 2 SUSPECTS (${selectedIds.length}/2)`
          : `CONFIRM ACCUSATION (${selectedIds.length}/1)`,
      confirmIndividual:
        voterIndex < players.length - 1
          ? `LOCK VOTE (${selectedIds.length}/${activeRequiredVotes})`
          : `REVEAL RESULTS (${selectedIds.length}/${activeRequiredVotes})`,
      passVoterTitle: 'SECRET VOTING BALLOT',
      passVoterTo: 'Pass the device to',
      unlockBallotBtn: 'OPEN MY BALLOT',
      voterProgress: `Voter ${voterIndex + 1} of ${players.length}`,
      tieTitle: 'TIE-BREAKER VOTE',
      tieDesc: (slots: number) =>
        `A tie occurred! Pick ${slots === 1 ? '1 final suspect' : `${slots} final suspects`} from the tied players.`,
      tieConfirm: (slots: number) =>
        `CONFIRM TIE-BREAKER (${selectedIds.length}/${slots})`
    }
  }[lang];

  // Secret ballot privacy gate in Individual Mode
  if (votingMode === 'individual' && !ballotUnlocked && !tieBreakState && currentVoter) {
    return (
      <motion.div
        key={`voter-gate-${currentVoter.id}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto space-y-6 py-4"
      >
        {!hasAnyCastBallot && (
          <div className="w-full p-1 rounded-2xl bg-white/[0.04] border border-white/10 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                playTap();
                onChangeVotingMode('group');
              }}
              className="py-2 rounded-xl text-[11px] font-display font-bold text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.modeGroup}</span>
            </button>
            <button
              type="button"
              className="py-2 rounded-xl text-[11px] font-display font-bold bg-rose-500/20 text-rose-200 border border-rose-400/30 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.modeIndividual}</span>
            </button>
          </div>
        )}

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-[0.18em] text-rose-300 uppercase">
          <Lock className="w-3 h-3" />
          <span>{t.voterProgress}</span>
        </div>

        <div
          className={`w-28 h-28 rounded-[28px] ${currentVoter.color} flex items-center justify-center text-5xl shadow-2xl border border-white/25`}
        >
          {currentVoter.emoji}
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
            {t.passVoterTo}
          </p>
          <h2 className="text-3xl font-bold font-display text-white uppercase">
            {currentVoter.name}
          </h2>
          <p className="text-xs text-slate-400 max-w-[260px] mx-auto pt-1">{t.indSub}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            playTap();
            setBallotUnlocked(true);
          }}
          className="w-full py-4 rounded-2xl bg-white text-slate-950 font-display font-bold text-xs tracking-[0.18em] uppercase shadow-xl hover:bg-rose-400 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Vote className="w-4 h-4" />
          <span>{t.unlockBallotBtn}</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="voting-screen"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col w-full max-w-md mx-auto flex-1 min-h-0 space-y-3.5"
    >
      {/* Header & Mode Switch (only before first ballot is cast) */}
      <div className="text-center space-y-2 shrink-0">
        {!hasAnyCastBallot && !tieBreakState && (
          <div className="w-full p-1 rounded-2xl bg-white/[0.04] border border-white/10 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                playTap();
                onChangeVotingMode('group');
              }}
              className={`py-2 rounded-xl text-[11px] font-display font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                votingMode === 'group'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.modeGroup}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTap();
                onChangeVotingMode('individual');
              }}
              className={`py-2 rounded-xl text-[11px] font-display font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                votingMode === 'individual'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.modeIndividual}</span>
            </button>
          </div>
        )}

        <div className="space-y-1">
          {tieBreakState ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t.tieTitle}</span>
              </div>
              <p className="text-xs text-slate-300 px-2">
                {t.tieDesc(tieBreakState.slotsRemainingToFill)}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
                  {votingMode === 'individual' && currentVoter
                    ? `${currentVoter.emoji} ${currentVoter.name}`
                    : t.title}
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                {votingMode === 'individual' ? t.indSub : t.groupSub}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Suspect Slots Indicator Bar (Crucial UX clarity for 1 vs 2 Impostors) */}
      <div
        className={`rounded-2xl p-3 border shrink-0 transition-colors ${
          activeRequiredVotes === 2
            ? 'glass-panel-crimson'
            : 'glass-panel border-white/10'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-rose-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            {activeRequiredVotes === 2 ? t.pickTwoAlert : t.pickOneAlert}
          </span>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/40 text-white border border-white/10">
            {selectedIds.length}/{activeRequiredVotes}
          </span>
        </div>

        <div className={`grid gap-2 ${activeRequiredVotes === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {Array.from({ length: activeRequiredVotes }).map((_, slotIdx) => {
            const pickedId = selectedIds[slotIdx];
            const pickedPlayer = players.find((p) => p.id === pickedId);

            return (
              <div
                key={slotIdx}
                className={`rounded-xl px-3 py-2 border flex items-center justify-between gap-2 min-h-[42px] transition-all ${
                  pickedPlayer
                    ? 'bg-white/10 border-rose-400/50 text-white'
                    : 'bg-black/30 border-dashed border-white/15 text-slate-500'
                }`}
              >
                {pickedPlayer ? (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{pickedPlayer.emoji}</span>
                      <span className="text-xs font-bold font-display truncate">
                        {pickedPlayer.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleCandidate(pickedPlayer.id)}
                      className="p-0.5 rounded-full hover:bg-white/15 text-slate-300 cursor-pointer shrink-0"
                      aria-label="Remover suspeito"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] font-mono truncate">
                    {activeRequiredVotes === 2 ? `${t.slotLabel(slotIdx)}: ` : ''}
                    {t.emptySlot}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {limitWarning && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[11px] font-medium text-amber-300 mt-2 text-center"
            >
              {t.limitMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Candidate Grid */}
      <div className="flex-1 min-h-0 glass-panel rounded-[26px] p-3.5 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2.5">
          {players.map((p) => {
            const selectionIndex = selectedIds.indexOf(p.id);
            const isSelected = selectionIndex !== -1;
            const isSelfInIndividual =
              votingMode === 'individual' && !tieBreakState && currentVoter?.id === p.id;
            const isExcludedInTieBreak =
              tieBreakState !== null && !tieBreakState.tiedCandidateIds.includes(p.id);
            const isDisabled = isSelfInIndividual || isExcludedInTieBreak;

            return (
              <motion.button
                key={p.id}
                whileTap={!isDisabled ? { scale: 0.96 } : undefined}
                type="button"
                disabled={isDisabled}
                onClick={() => handleToggleCandidate(p.id)}
                className={`relative rounded-2xl p-3.5 flex flex-col items-center justify-between min-h-[126px] border transition-all select-none overflow-hidden ${
                  isDisabled
                    ? 'bg-white/[0.02] border-white/5 opacity-35 cursor-not-allowed'
                    : isSelected
                      ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/70 shadow-[0_10px_28px_rgba(244,63,94,0.28)] cursor-pointer'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 cursor-pointer'
                }`}
              >
                {/* Top Status Badge */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`w-2 h-2 rounded-full ${p.color} border border-white/30`}
                  />
                  {isSelfInIndividual ? (
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {t.youBadge}
                    </span>
                  ) : isSelected ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold shadow">
                      <Check className="w-3 h-3" />
                      {activeRequiredVotes === 2 ? t.selectedBadge(selectionIndex) : ''}
                    </span>
                  ) : null}
                </div>

                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center text-3xl shadow-lg border border-white/20 my-1.5`}
                >
                  {p.emoji}
                </div>

                {/* Name */}
                <span className="w-full text-center font-bold font-display text-xs text-white truncate px-1">
                  {p.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Confirm CTA */}
      <div className="shrink-0 pt-1">
        <motion.button
          whileTap={isSelectionComplete ? { scale: 0.98 } : undefined}
          type="button"
          disabled={!isSelectionComplete}
          onClick={handleConfirmCurrentVote}
          className={`w-full py-4 rounded-2xl font-display font-bold text-xs tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${
            isSelectionComplete
              ? 'bg-white text-slate-950 hover:bg-rose-500 hover:text-white shadow-[0_10px_30px_rgba(255,255,255,0.12)] cursor-pointer'
              : 'bg-white/[0.04] text-slate-500 border border-white/10 cursor-not-allowed'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>
            {tieBreakState
              ? t.tieConfirm(tieBreakState.slotsRemainingToFill)
              : votingMode === 'individual'
                ? t.confirmIndividual
                : t.confirmGroup}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
