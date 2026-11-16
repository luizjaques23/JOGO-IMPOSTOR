import React from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Home,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  XCircle
} from 'lucide-react';
import { GameData, Language, Player, RoundOutcome } from '../types';
import { playTap } from '../utils/audio';

interface ResultScreenProps {
  players: Player[];
  gameData: GameData;
  outcome: RoundOutcome;
  lang: Language;
  onPlayNewRound: () => void;
  onGoHome: () => void;
}

export default function ResultScreen({
  players,
  gameData,
  outcome,
  lang,
  onPlayNewRound,
  onGoHome
}: ResultScreenProps) {
  const impostorCount = gameData.impostors.length;
  const isFullVictory = outcome.status === 'full_victory';
  const isPartialVictory = outcome.status === 'partial_victory';

  const accusedPlayers = outcome.accusedIds
    .map((id) => players.find((p) => p.id === id))
    .filter((p): p is Player => Boolean(p));

  const impostorPlayers = gameData.impostors
    .map((id) => players.find((p) => p.id === id))
    .filter((p): p is Player => Boolean(p));

  const rankedPlayers = [...players].sort(
    (a, b) => (outcome.voteCounts[b.id] || 0) - (outcome.voteCounts[a.id] || 0)
  );
  const maxVotes = Math.max(1, ...rankedPlayers.map((p) => outcome.voteCounts[p.id] || 0));

  const t = {
    pt: {
      fullWinTitle: impostorCount > 1 ? 'TODOS OS IMPOSTORES PEGOS!' : 'IMPOSTOR DESMASCARADO!',
      fullWinDesc:
        impostorCount > 1
          ? 'Investigação impecável! A mesa identificou os dois infiltrados.'
          : 'Excelente dedução! O grupo descobriu a farsa a tempo.',
      partialTitle: '1 DE 2 IMPOSTORES PEGO!',
      partialDesc: 'Um infiltrado caiu, mas o segundo conseguiu escapar nas sombras.',
      defeatTitle: impostorCount > 1 ? 'OS IMPOSTORES ESCAPARAM!' : 'O IMPOSTOR ESCAPOU!',
      defeatDesc:
        impostorCount > 1
          ? 'Os dois infiltrados manipularam a mesa e venceram a rodada.'
          : 'O blefe funcionou! O impostor enganou toda a mesa.',
      mostVotedLabel:
        outcome.votingMode === 'individual'
          ? 'MAIS VOTADOS PELA MESA'
          : outcome.accusedIds.length > 1
            ? 'SUSPEITOS ACUSADOS'
            : 'SUSPEITO ACUSADO',
      impostorsLabel: impostorCount > 1 ? 'OS IMPOSTORES ERAM' : 'O IMPOSTOR ERA',
      secretWordLabel: 'PALAVRA SECRETA',
      impostorClueLabel: 'PISTA DO IMPOSTOR',
      caughtTag: 'IMPOSTOR ✓',
      innocentTag: 'INOCENTE ✗',
      escapedTag: 'ESCAPOU',
      unmaskedTag: 'PEGO',
      votesUnit: (n: number) => (n === 1 ? '1 voto' : `${n} votos`),
      voteBreakdown: 'APURAÇÃO DE VOTOS',
      newRoundBtn: 'NOVA RODADA',
      homeBtn: 'INÍCIO'
    },
    en: {
      fullWinTitle: impostorCount > 1 ? 'ALL IMPOSTORS CAUGHT!' : 'IMPOSTOR UNMASKED!',
      fullWinDesc:
        impostorCount > 1
          ? 'Flawless investigation! The table identified both infiltrators.'
          : 'Sharp deduction! The crew exposed the fake player in time.',
      partialTitle: '1 OF 2 IMPOSTORS CAUGHT!',
      partialDesc: 'One infiltrator was exposed, while the second slipped away.',
      defeatTitle: impostorCount > 1 ? 'THE IMPOSTORS ESCAPED!' : 'IMPOSTOR ESCAPED!',
      defeatDesc:
        impostorCount > 1
          ? 'Both infiltrators manipulated the table and won the round.'
          : 'The bluff worked! The impostor fooled the entire table.',
      mostVotedLabel:
        outcome.votingMode === 'individual'
          ? 'MOST VOTED PLAYERS'
          : outcome.accusedIds.length > 1
            ? 'ACCUSED SUSPECTS'
            : 'ACCUSED SUSPECT',
      impostorsLabel: impostorCount > 1 ? 'THE IMPOSTORS WERE' : 'THE IMPOSTOR WAS',
      secretWordLabel: 'SECRET WORD',
      impostorClueLabel: 'IMPOSTOR CLUE',
      caughtTag: 'IMPOSTOR ✓',
      innocentTag: 'INNOCENT ✗',
      escapedTag: 'ESCAPED',
      unmaskedTag: 'CAUGHT',
      votesUnit: (n: number) => (n === 1 ? '1 vote' : `${n} votes`),
      voteBreakdown: 'VOTE BREAKDOWN',
      newRoundBtn: 'NEW ROUND',
      homeBtn: 'HOME'
    }
  }[lang];

  const panelClass = isFullVictory
    ? 'glass-panel-emerald'
    : isPartialVictory
      ? 'glass-panel-amber'
      : 'glass-panel-crimson';

  const titleColor = isFullVictory
    ? 'text-emerald-400'
    : isPartialVictory
      ? 'text-amber-400'
      : 'text-rose-400';

  const bannerTitle = isFullVictory
    ? t.fullWinTitle
    : isPartialVictory
      ? t.partialTitle
      : t.defeatTitle;

  const bannerDesc = isFullVictory
    ? t.fullWinDesc
    : isPartialVictory
      ? t.partialDesc
      : t.defeatDesc;

  return (
    <motion.div
      key="result-screen"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto space-y-4 py-1"
    >
      {/* Outcome Hero Card */}
      <div className={`${panelClass} rounded-[28px] p-5 sm:p-6 text-center space-y-4`}>
        <motion.div
          initial={{ scale: 0.6, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border ${
            isFullVictory
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              : isPartialVictory
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-rose-500/20 border-rose-400/40 text-rose-300'
          }`}
        >
          {isFullVictory ? (
            <Award className="w-8 h-8" />
          ) : isPartialVictory ? (
            <AlertTriangle className="w-8 h-8" />
          ) : (
            <ShieldAlert className="w-8 h-8" />
          )}
        </motion.div>

        <div className="space-y-1.5">
          <h1 className={`text-xl sm:text-2xl font-bold font-display uppercase tracking-tight ${titleColor}`}>
            {bannerTitle}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">{bannerDesc}</p>
        </div>

        {/* Secret Word + Impostor Hint */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="rounded-2xl bg-black/40 border border-white/10 p-3 text-left">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-300 block">
              {t.secretWordLabel}
            </span>
            <p className="text-sm sm:text-base font-bold font-display text-white mt-0.5 leading-snug">
              {gameData.secretWord[lang]}
            </p>
          </div>
          <div className="rounded-2xl bg-black/40 border border-white/10 p-3 text-left">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-rose-300 block">
              {t.impostorClueLabel}
            </span>
            <p className="text-sm sm:text-base font-bold font-display text-rose-200 mt-0.5 leading-snug">
              “{gameData.secretHint[lang]}”
            </p>
          </div>
        </div>
      </div>

      {/* Accused / Most Voted Section */}
      <div className="glass-panel rounded-[24px] p-4 space-y-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400 block">
          {t.mostVotedLabel}
        </span>

        <div className="space-y-2">
          {accusedPlayers.map((p) => {
            const wasImpostor = gameData.impostors.includes(p.id);
            const voteCount = outcome.voteCounts[p.id] || 0;

            return (
              <div
                key={p.id}
                className={`rounded-2xl p-3 border flex items-center justify-between gap-3 ${
                  wasImpostor
                    ? 'bg-emerald-500/10 border-emerald-400/30'
                    : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-xl shrink-0 border border-white/20`}
                  >
                    {p.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold font-display text-white truncate">
                      {p.name}
                    </p>
                    {outcome.votingMode === 'individual' && (
                      <p className="text-[10px] font-mono text-slate-400">
                        {t.votesUnit(voteCount)}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                    wasImpostor
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-rose-500/15 text-rose-300 border border-rose-400/25'
                  }`}
                >
                  {wasImpostor ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  <span>{wasImpostor ? t.caughtTag : t.innocentTag}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real Impostors Section */}
      <div className="glass-panel rounded-[24px] p-4 space-y-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-rose-300 block">
          {t.impostorsLabel}
        </span>

        <div className="flex flex-wrap gap-2">
          {impostorPlayers.map((imp) => {
            const wasCaught = outcome.caughtImpostorIds.includes(imp.id);
            return (
              <div
                key={imp.id}
                className="flex-1 min-w-[140px] rounded-2xl bg-black/35 border border-white/10 p-3 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-lg ${imp.color} flex items-center justify-center text-base shrink-0 border border-white/20`}
                  >
                    {imp.emoji}
                  </span>
                  <span className="text-xs font-bold font-display text-white truncate">
                    {imp.name}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    wasCaught
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {wasCaught ? t.unmaskedTag : t.escapedTag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Vote Distribution Chart */}
      {outcome.votingMode === 'individual' && (
        <div className="glass-panel rounded-[24px] p-4 space-y-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400 block">
            {t.voteBreakdown}
          </span>
          <div className="space-y-2">
            {rankedPlayers.map((p) => {
              const votes = outcome.voteCounts[p.id] || 0;
              const widthPct = Math.round((votes / maxVotes) * 100);
              const isImp = gameData.impostors.includes(p.id);
              return (
                <div key={p.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-200 flex items-center gap-1.5">
                      <span>{p.emoji}</span>
                      <span>{p.name}</span>
                      {isImp && (
                        <span className="text-[9px] font-mono text-rose-400 uppercase">
                          (Imp)
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-slate-400">{t.votesUnit(votes)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        isImp ? 'bg-rose-500' : 'bg-cyan-400/70'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex gap-3 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            playTap();
            onGoHome();
          }}
          className="py-4 px-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/12 text-white font-display font-bold text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{t.homeBtn}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            playTap();
            onPlayNewRound();
          }}
          className="flex-1 py-4 rounded-2xl bg-white text-slate-950 hover:bg-cyan-300 font-display font-bold text-xs tracking-[0.18em] uppercase shadow-[0_10px_28px_rgba(255,255,255,0.14)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.newRoundBtn}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
