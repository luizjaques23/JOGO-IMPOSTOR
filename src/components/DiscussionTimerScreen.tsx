import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Pause, Play, RefreshCw, Sparkles, Vote, Zap } from 'lucide-react';
import { GameData, Language, Player, QuestionTag } from '../types';
import { playTap } from '../utils/audio';

interface DiscussionTimerScreenProps {
  gameData: GameData;
  startingPlayer: Player | undefined;
  timeLeft: number;
  totalTimeSeconds: number;
  timerActive: boolean;
  lang: Language;
  onToggleTimer: () => void;
  onStartVoting: () => void;
}

const TAG_LABELS: Record<QuestionTag, { pt: string; en: string; style: string }> = {
  psychological: {
    pt: 'Psicológica',
    en: 'Psychological',
    style: 'text-violet-300 bg-violet-500/15 border-violet-400/25'
  },
  dilemma: {
    pt: 'Dilema',
    en: 'Dilemma',
    style: 'text-amber-300 bg-amber-500/15 border-amber-400/25'
  },
  scenario: {
    pt: 'Cenário',
    en: 'Scenario',
    style: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/25'
  },
  bluff: {
    pt: 'Teste de Blefe',
    en: 'Bluff Test',
    style: 'text-rose-300 bg-rose-500/15 border-rose-400/25'
  }
};

export default function DiscussionTimerScreen({
  gameData,
  startingPlayer,
  timeLeft,
  totalTimeSeconds,
  timerActive,
  lang,
  onToggleTimer,
  onStartVoting
}: DiscussionTimerScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = gameData.questions;
  const currentQuestion = questions.length > 0 ? questions[questionIndex % questions.length] : null;

  const progress = totalTimeSeconds > 0 ? Math.max(0, Math.min(1, timeLeft / totalTimeSeconds)) : 0;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 15;
  const isFinished = timeLeft === 0;

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const t = {
    pt: {
      title: 'INVESTIGAÇÃO',
      subtitle: 'Use perguntas estratégicas para expor quem está blefando',
      startsLabel: 'Começa perguntando',
      twistBadge: 'Regra Especial da Rodada',
      questionHeader: 'PERGUNTA ESTRATÉGICA',
      nextQuestion: 'Trocar',
      pause: 'PAUSAR',
      resume: 'RETOMAR',
      voteNow: 'VOTAR AGORA',
      timeUp: 'TEMPO ESGOTADO!'
    },
    en: {
      title: 'INVESTIGATION',
      subtitle: 'Use strategic questions to expose whoever is bluffing',
      startsLabel: 'Starts asking',
      twistBadge: 'Round Twist Rule',
      questionHeader: 'STRATEGIC QUESTION',
      nextQuestion: 'Next',
      pause: 'PAUSE',
      resume: 'RESUME',
      voteNow: 'VOTE NOW',
      timeUp: "TIME'S UP!"
    }
  }[lang];

  return (
    <motion.div
      key="timer-screen"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col w-full max-w-md mx-auto space-y-4 py-1"
    >
      {/* Top Category & Title */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
          <span className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300">
            {gameData.categoryName[lang]} • {gameData.impostors.length}{' '}
            {gameData.impostors.length === 1 ? 'Impostor' : lang === 'pt' ? 'Impostores' : 'Impostors'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
          {isFinished ? t.timeUp : t.title}
        </h2>
        <p className="text-xs text-slate-400 font-sans px-2">{t.subtitle}</p>
      </div>

      {/* Compact Timer + Starting Player Row */}
      <div className="grid grid-cols-[auto_1fr] gap-3 items-center glass-panel rounded-[24px] p-4">
        {/* SVG Progress Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="7"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke={isUrgent ? '#f43f5e' : '#38bdf8'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Clock className={`w-3.5 h-3.5 mb-0.5 ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
            <span className={`text-2xl font-bold font-mono tracking-tight ${isUrgent ? 'text-rose-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Who Starts + Twist Info */}
        <div className="space-y-2.5 min-w-0">
          {startingPlayer && (
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-xl ${startingPlayer.color} flex items-center justify-center text-xl shrink-0 border border-white/20`}
              >
                {startingPlayer.emoji}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-300 block">
                  {t.startsLabel}
                </span>
                <span className="text-sm font-bold font-display text-white truncate block">
                  {startingPlayer.name}
                </span>
              </div>
            </div>
          )}

          {gameData.twist && (
            <div className="rounded-2xl bg-amber-500/10 border border-amber-400/25 p-2.5">
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-amber-300 font-bold">
                <Zap className="w-3 h-3 shrink-0" />
                <span className="truncate">{gameData.twist.title[lang]}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mt-1">
                {gameData.twist.desc[lang]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Strategic Question Card */}
      {currentQuestion && (
        <div className="glass-panel-cyan rounded-[24px] p-4 sm:p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {t.questionHeader}
              </span>
              <span
                className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  TAG_LABELS[currentQuestion.tag].style
                }`}
              >
                {TAG_LABELS[currentQuestion.tag][lang]}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                playTap();
                setQuestionIndex((prev) => prev + 1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-[11px] font-display font-bold text-white transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.nextQuestion}</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="text-sm sm:text-[15px] font-medium text-slate-100 leading-relaxed font-sans"
            >
              “{currentQuestion.text[lang]}”
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <span>
              {(questionIndex % questions.length) + 1}/{questions.length}
            </span>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex gap-3 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            playTap();
            onToggleTimer();
          }}
          disabled={isFinished}
          className={`flex-1 py-4 rounded-2xl border font-display font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors ${
            isFinished
              ? 'bg-white/[0.03] border-white/5 text-slate-600 cursor-not-allowed'
              : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/12 text-white cursor-pointer'
          }`}
        >
          {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{timerActive ? t.pause : t.resume}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onStartVoting}
          className="flex-[1.3] py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-display font-bold text-xs tracking-[0.16em] uppercase shadow-[0_10px_30px_rgba(244,63,94,0.32)] flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Vote className="w-4 h-4" />
          <span>{t.voteNow}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
