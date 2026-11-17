import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronRight,
  Edit2,
  HelpCircle,
  Lock,
  Play,
  Shuffle,
  ShieldAlert,
  Sparkles,
  Trash2,
  Users,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

import { CATEGORIES } from './data/categories';
import {
  DifficultyLevel,
  GameData,
  GameSettings,
  Language,
  Player,
  RoundOutcome,
  ScreenType
} from './types';
import SplashScreen from './components/SplashScreen';
import HowToPlayModal from './components/HowToPlayModal';
import AvatarPicker, { AVATAR_COLORS, AVATAR_EMOJIS } from './components/AvatarPicker';
import SecretRevealFlow from './components/SecretRevealFlow';
import DiscussionTimerScreen from './components/DiscussionTimerScreen';
import VotingScreen from './components/VotingScreen';
import ResultScreen from './components/ResultScreen';
import {
  clampSettingsForPlayers,
  createRoundData,
  getMaxImpostors
} from './utils/gameLogic';
import {
  playAlarm,
  playDefeat,
  playDelete,
  playPartialVictory,
  playTap,
  playTick,
  playVictory,
  setMuted
} from './utils/audio';

const TRANSLATIONS = {
  pt: {
    back: 'VOLTAR',
    brand: 'IMPOSTOR',
    subtitle: 'Mistério • Blefe • Dedução',
    heroDesc:
      'Os agentes recebem a Palavra Secreta. Os impostores recebem apenas uma pista sutil — e precisam sobreviver ao debate sem serem desmascarados.',
    playNow: 'INICIAR PARTIDA',
    readyCrew: (n: number) => `Mesa salva: ${n} jogadores`,
    playersTitle: 'MESA DE AGENTES',
    playersSubtitle: 'Adicione os jogadores da partida (mínimo 3)',
    enterName: 'Nome do jogador...',
    addPlayer: 'Adicionar',
    minPlayersAlert: 'Adicione pelo menos 3 jogadores para iniciar!',
    continueBtn: 'CONFIGURAR RODADA',
    playersCount: 'Jogadores',
    emptyLobbyTitle: 'NENHUM AGENTE NA MESA',
    emptyLobbyDesc: 'Digite os nomes abaixo para montar o grupo. Mínimo de 3 jogadores.',
    editAvatarTooltip: 'Editar perfil',
    settingsTitle: 'REGRAS DA MISSÃO',
    settingsSubtitle: 'Ajuste dificuldade, impostores e votação',
    impostorsLabel: 'Quantidade de Impostores',
    minFivePlayers: 'Mín: 5 jogadores',
    cantSelectImposter: 'São necessários pelo menos 5 jogadores para jogar com 2 impostores.',
    difficultyLabel: 'Nível das Palavras & Dicas',
    diffBalanced: 'Equilibrado',
    diffBalancedDesc: 'Temas envolventes e pistas sutis',
    diffTactical: 'Tático',
    diffTacticalDesc: 'Conceitos mais complexos e blefe intenso',
    diffMastermind: 'Mente Mestre',
    diffMastermindDesc: 'Ideias abstratas e pistas enigmáticas',
    votingModeLabel: 'Sistema de Votação',
    votingGroup: 'Mesa (Rápida)',
    votingGroupDesc: 'O grupo decide e marca os suspeitos',
    votingIndividual: 'Secreta (Por Jogador)',
    votingIndividualDesc: 'Cada jogador vota em segredo no aparelho',
    durationLabel: 'Tempo de Discussão',
    twistsLabel: 'Eventos Imprevisíveis',
    twistsDesc: 'Adiciona uma regra tática aleatória em cada rodada',
    startRound: 'ESCOLHER CATEGORIA',
    categoriesTitle: 'ESCOLHA O DOSSIÊ',
    categoriesSubtitle: '12 categorias • 180 desafios estratégicos',
    randomCategoryTitle: 'Dossiê Aleatório',
    randomCategoryDesc: 'Surpreenda a mesa sorteando categoria e tema automaticamente',
    wordsTag: 'desafios',
    installTitle: 'INSTALAR COMO APP',
    installDesc: 'Jogue em tela cheia no Android ou iPhone sem barras do navegador.',
    installBtn: 'INSTALAR APLICATIVO',
    howToPlayTooltip: 'Manual do jogo',
    muteTooltip: 'Ativar/desativar som',
    feature1Title: '180+ Desafios',
    feature1Desc: '3 níveis táticos',
    feature2Title: 'Pistas Sutis',
    feature2Desc: 'Anti-óbvio',
    feature3Title: 'Voto Duplo',
    feature3Desc: 'Para 2 impostores'
  },
  en: {
    back: 'BACK',
    brand: 'IMPOSTOR',
    subtitle: 'Mystery • Bluff • Deduction',
    heroDesc:
      'Agents receive the Secret Word. Impostors receive only a subtle clue — and must survive the table debate without blowing their cover.',
    playNow: 'START MATCH',
    readyCrew: (n: number) => `Saved table: ${n} players`,
    playersTitle: 'AGENT TABLE',
    playersSubtitle: 'Add players for this match (minimum 3)',
    enterName: 'Player name...',
    addPlayer: 'Add',
    minPlayersAlert: 'Add at least 3 players to start!',
    continueBtn: 'CONFIGURE ROUND',
    playersCount: 'Players',
    emptyLobbyTitle: 'EMPTY TABLE',
    emptyLobbyDesc: 'Add friends below to build your crew. Minimum 3 players.',
    editAvatarTooltip: 'Customize',
    settingsTitle: 'MISSION RULES',
    settingsSubtitle: 'Tune difficulty, impostors, and voting',
    impostorsLabel: 'Number of Impostors',
    minFivePlayers: 'Min: 5 players',
    cantSelectImposter: 'At least 5 players are required to play with 2 impostors.',
    difficultyLabel: 'Word & Clue Difficulty',
    diffBalanced: 'Balanced',
    diffBalancedDesc: 'Engaging themes and subtle clues',
    diffTactical: 'Tactical',
    diffTacticalDesc: 'Sharper concepts and high-stakes bluffing',
    diffMastermind: 'Mastermind',
    diffMastermindDesc: 'Abstract ideas and cryptic clues',
    votingModeLabel: 'Voting System',
    votingGroup: 'Table (Quick)',
    votingGroupDesc: 'Group discusses and marks suspects',
    votingIndividual: 'Secret (Per Player)',
    votingIndividualDesc: 'Each player casts a hidden ballot',
    durationLabel: 'Discussion Timer',
    twistsLabel: 'Unpredictable Twists',
    twistsDesc: 'Adds a random tactical rule modifier each round',
    startRound: 'CHOOSE CATEGORY',
    categoriesTitle: 'CHOOSE A DOSSIER',
    categoriesSubtitle: '12 categories • 180 strategic challenges',
    randomCategoryTitle: 'Mystery Random',
    randomCategoryDesc: 'Keep everyone guessing with an automatic random category',
    wordsTag: 'challenges',
    installTitle: 'INSTALL AS APP',
    installDesc: 'Play full-screen on Android or iPhone without browser bars.',
    installBtn: 'INSTALL APP',
    howToPlayTooltip: 'Field manual',
    muteTooltip: 'Toggle sound',
    feature1Title: '180+ Prompts',
    feature1Desc: '3 tactical tiers',
    feature2Title: 'Subtle Clues',
    feature2Desc: 'Non-obvious',
    feature3Title: 'Dual Voting',
    feature3Desc: 'For 2 impostors'
  }
} as const;

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [screen, setScreen] = useState<ScreenType>('home');
  const [lang, setLang] = useState<Language>('pt');
  const [mutedState, setMutedState] = useState<boolean>(false);

  // Players state
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [inlineToast, setInlineToast] = useState<string | null>(null);

  // Avatar modal state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [avatarColor, setAvatarColor] = useState<string>(AVATAR_COLORS[0]);
  const [avatarEmoji, setAvatarEmoji] = useState<string>(AVATAR_EMOJIS[0]);

  // Rules modal
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);

  // Game settings
  const [settings, setSettings] = useState<GameSettings>({
    impostorCount: 1,
    timeMinutes: 2,
    language: 'pt',
    difficulty: 'balanced',
    votingMode: 'group',
    enableTwists: true
  });

  // Round state
  const [recentlyUsedWords, setRecentlyUsedWords] = useState<string[]>([]);
  const [gameData, setGameData] = useState<GameData>({
    categoryId: '',
    categoryName: { pt: '', en: '' },
    secretWord: { pt: '', en: '' },
    secretHint: { pt: '', en: '' },
    difficulty: 'balanced',
    impostors: [],
    twist: null,
    questions: []
  });

  const [turnIndex, setTurnIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [startingPlayerId, setStartingPlayerId] = useState<string | null>(null);
  const [roundOutcome, setRoundOutcome] = useState<RoundOutcome | null>(null);

  // PWA install prompt
  const [installPrompt, setInstallPrompt] = useState<{
    prompt: () => void;
    userChoice: Promise<{ outcome: string }>;
  } | null>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as unknown as typeof installPrompt);
      setShowInstallBtn(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallBtn(false);
    }
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Keep impostorCount valid whenever player count changes
  useEffect(() => {
    setSettings((prev) => clampSettingsForPlayers(prev, players.length));
  }, [players.length]);

  // Sync audio mute state
  useEffect(() => {
    setMuted(mutedState);
  }, [mutedState]);

  // Auto-dismiss inline toast
  useEffect(() => {
    if (!inlineToast) return;
    const timer = setTimeout(() => setInlineToast(null), 2600);
    return () => clearTimeout(timer);
  }, [inlineToast]);

  // Game timer loop
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        const nextVal = prev - 1;
        if (nextVal <= 10 && nextVal > 0) {
          playTick(true);
        } else if (nextVal % 2 === 0 && nextVal > 0) {
          playTick(false);
        }
        if (nextVal === 0) {
          setTimerActive(false);
          setTimerExpired(true);
          playAlarm();
        }
        return nextVal;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  // Automatically proceed to voting shortly after the timer runs out
  useEffect(() => {
    if (!timerExpired || screen !== 'timer') return;
    const timeout = setTimeout(() => {
      setTimerExpired(false);
      setScreen('voting');
    }, 1200);
    return () => clearTimeout(timeout);
  }, [timerExpired, screen]);

  const t = TRANSLATIONS[lang];
  const startingPlayer = players.find((p) => p.id === startingPlayerId);

  const showToast = (msg: string) => {
    setInlineToast(msg);
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    playTap();
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallBtn(false);
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;

    const colIndex = players.length % AVATAR_COLORS.length;
    const emoIndex = players.length % AVATAR_EMOJIS.length;

    const newPlayer: Player = {
      id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: trimmed.slice(0, 16),
      color: AVATAR_COLORS[colIndex],
      textColor: 'text-white',
      emoji: AVATAR_EMOJIS[emoIndex]
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setNewPlayerName('');
    setInlineToast(null);
    playTap();
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    playDelete();
  };

  const startEditingAvatar = (player: Player) => {
    playTap();
    setEditingPlayerId(player.id);
    setAvatarColor(player.color);
    setAvatarEmoji(player.emoji);
    setIsAvatarModalOpen(true);
  };

  const finishEditingAvatar = () => {
    if (editingPlayerId) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === editingPlayerId ? { ...p, color: avatarColor, emoji: avatarEmoji } : p
        )
      );
    }
    setIsAvatarModalOpen(false);
    setEditingPlayerId(null);
  };

  const proceedToCategories = () => {
    if (players.length < 3) {
      playDelete();
      showToast(t.minPlayersAlert);
      return;
    }
    playTap();
    setScreen('categories');
  };

  const handleSelectCategory = (categoryId: string | 'random') => {
    if (players.length < 3) {
      showToast(t.minPlayersAlert);
      setScreen('players');
      return;
    }
    playTap();

    const safeSettings = clampSettingsForPlayers({ ...settings, language: lang }, players.length);
    const round = createRoundData(players, categoryId, safeSettings, recentlyUsedWords);

    setRecentlyUsedWords((prev) => [...prev.slice(-24), round.secretWord.pt]);
    setGameData(round);
    setTurnIndex(0);
    setRoundOutcome(null);
    setTimerActive(false);
    setScreen('pass');
  };

  const handleStartTimer = () => {
    playTap();
    if (players.length > 0) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setStartingPlayerId(players[randomIndex].id);
    } else {
      setStartingPlayerId(null);
    }
    setTimeLeft(settings.timeMinutes * 60);
    setTimerExpired(false);
    setTimerActive(true);
    setScreen('timer');
  };

  const handleStartVoting = () => {
    playTap();
    setTimerActive(false);
    setTimerExpired(false);
    setScreen('voting');
  };

  const handleCompleteVoting = (outcome: RoundOutcome) => {
    setRoundOutcome(outcome);
    if (outcome.status === 'full_victory') {
      playVictory();
    } else if (outcome.status === 'partial_victory') {
      playPartialVictory();
    } else {
      playDefeat();
    }
    setScreen('result');
  };

  const handleHeaderBack = () => {
    playTap();
    if (screen === 'home') return;
    setTimerActive(false);
    setTimerExpired(false);
    if (screen === 'players') setScreen('home');
    else if (screen === 'settings') setScreen('players');
    else if (screen === 'categories') setScreen('settings');
    else if (screen === 'pass') setScreen('categories');
    else if (screen === 'reveal') setScreen('pass');
    else if (screen === 'timer') setScreen('categories');
    else if (screen === 'voting') setScreen('timer');
    else if (screen === 'result') setScreen('categories');
  };

  const getDynamicGlow = () => {
    switch (screen) {
      case 'voting':
      case 'reveal':
        return 'from-rose-500/12 via-transparent to-cyan-500/10';
      case 'result':
        if (roundOutcome?.status === 'full_victory') {
          return 'from-emerald-500/14 via-transparent to-cyan-500/10';
        }
        if (roundOutcome?.status === 'partial_victory') {
          return 'from-amber-500/14 via-transparent to-rose-500/10';
        }
        return 'from-rose-500/16 via-transparent to-indigo-500/10';
      default:
        return 'from-cyan-500/10 via-transparent to-rose-500/10';
    }
  };

  const hideBackButton = screen === 'home';

  return (
    <div className="min-h-[100dvh] h-[100dvh] text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden immersive-bg">
      {/* Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen lang={lang} onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Atmospheric Grid & Ambient Gradient */}
      <div className="absolute inset-0 noir-grid opacity-45 pointer-events-none z-0" />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getDynamicGlow()} pointer-events-none z-0 transition-all duration-700`}
      />

      {/* Global Header */}
      <header className="relative z-20 px-4 sm:px-6 pt-safe pb-3 flex items-center justify-between border-b border-white/[0.07] bg-[#07080f]/75 backdrop-blur-md shrink-0">
        <button
          type="button"
          onClick={handleHeaderBack}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[11px] font-bold transition-all border border-white/10 cursor-pointer font-display tracking-wider ${
            hideBackButton ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.back}</span>
        </button>

        {/* Centered Brand Wordmark */}
        <button
          type="button"
          onClick={() => {
            playTap();
            setTimerActive(false);
            setScreen('home');
          }}
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 cursor-pointer select-none group"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
          <span className="text-sm sm:text-base font-bold font-display tracking-[0.2em] text-white">
            IMPOST<span className="text-rose-400">OR</span>
          </span>
        </button>

        {/* Right Controls: Language, Audio Mute, Rules */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              playTap();
              const nextLang: Language = lang === 'pt' ? 'en' : 'pt';
              setLang(nextLang);
              setSettings((prev) => ({ ...prev, language: nextLang }));
            }}
            className="px-2.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[10px] font-mono font-bold text-slate-300 border border-white/10 cursor-pointer transition-colors"
            title="PT / EN"
          >
            {lang.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => {
              const nextMuted = !mutedState;
              setMutedState(nextMuted);
              if (!nextMuted) {
                setMuted(false);
                playTap();
              }
            }}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 cursor-pointer transition-colors"
            title={t.muteTooltip}
            aria-label={t.muteTooltip}
          >
            {mutedState ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-300" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              playTap();
              setIsRulesModalOpen(true);
            }}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 cursor-pointer transition-colors"
            title={t.howToPlayTooltip}
            aria-label={t.howToPlayTooltip}
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </header>

      {/* Inline Notification Toast */}
      <AnimatePresence>
        {inlineToast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-2xl bg-rose-950/90 border border-rose-400/40 text-rose-100 text-xs font-medium shadow-2xl backdrop-blur-md max-w-[90vw] text-center"
          >
            {inlineToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport */}
      <main className="flex-1 min-h-0 w-full max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col justify-center overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          {/* SCREEN: HOME */}
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center justify-center text-center space-y-5 py-2 my-auto"
            >
              {/* Brand Emblem */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase">
                  <Lock className="w-3 h-3" />
                  <span>{t.subtitle}</span>
                </div>

                <h1 className="text-[clamp(2.5rem,11vw,3.75rem)] font-bold font-display tracking-[0.08em] leading-none text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                  IMPOST<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">OR</span>
                </h1>
              </div>

              {/* Dossier Overview Card */}
              <div className="w-full glass-panel rounded-[26px] p-5 text-left space-y-4">
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                  {t.heroDesc}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-2.5 text-center">
                    <span className="text-[11px] font-bold font-display text-cyan-300 block">
                      {t.feature1Title}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.feature1Desc}</span>
                  </div>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-2.5 text-center">
                    <span className="text-[11px] font-bold font-display text-amber-300 block">
                      {t.feature2Title}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.feature2Desc}</span>
                  </div>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-2.5 text-center">
                    <span className="text-[11px] font-bold font-display text-rose-300 block">
                      {t.feature3Title}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.feature3Desc}</span>
                  </div>
                </div>
              </div>

              {/* PWA Install Prompt (shown cleanly when installable or compact guide) */}
              {showInstallBtn && (
                <div className="w-full glass-panel-cyan rounded-2xl p-3.5 flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      {t.installTitle}
                    </p>
                    <p className="text-[11px] text-slate-300 truncate">{t.installDesc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="px-3.5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-display font-bold text-[10px] uppercase tracking-wider shrink-0 cursor-pointer hover:bg-cyan-300 transition-colors"
                  >
                    {t.installBtn}
                  </button>
                </div>
              )}

              {/* Primary Play CTA */}
              <div className="w-full space-y-2.5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => {
                    playTap();
                    setScreen('players');
                  }}
                  className="w-full py-4.5 rounded-2xl bg-white text-slate-950 hover:bg-cyan-300 font-bold font-display text-xs tracking-[0.2em] uppercase transition-colors shadow-[0_12px_35px_rgba(255,255,255,0.14)] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.playNow}</span>
                </motion.button>

                {players.length > 0 && (
                  <p className="text-[11px] font-mono text-cyan-300/80">
                    {t.readyCrew(players.length)}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* SCREEN: PLAYERS */}
          {screen === 'players' && (
            <motion.div
              key="players"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col flex-1 min-h-0 space-y-3.5"
            >
              <div className="text-center space-y-1 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
                  {t.playersTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.playersSubtitle}</p>
              </div>

              <div className="flex-1 min-h-0 glass-panel rounded-[26px] flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                  {players.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-3 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Users className="w-7 h-7 text-cyan-300/80" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-xs text-white uppercase tracking-[0.16em] font-display">
                          {t.emptyLobbyTitle}
                        </p>
                        <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                          {t.emptyLobbyDesc}
                        </p>
                      </div>
                    </div>
                  ) : (
                    players.map((p) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={p.id}
                        className="rounded-2xl bg-white/[0.04] border border-white/10 p-2.5 pl-3 flex items-center justify-between gap-2 relative overflow-hidden"
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${p.color}`} />

                        <div className="flex items-center gap-3 pl-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => startEditingAvatar(p)}
                            className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform shrink-0`}
                            title={t.editAvatarTooltip}
                          >
                            {p.emoji}
                          </button>
                          <span className="font-bold text-sm font-display text-white truncate">
                            {p.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditingAvatar(p)}
                            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 transition-colors cursor-pointer"
                            title={t.editAvatarTooltip}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePlayer(p.id)}
                            className="p-2 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="p-3 border-t border-white/10 bg-black/25 shrink-0">
                  <form
                    onSubmit={handleAddPlayer}
                    className="flex gap-2 bg-white/[0.04] border border-white/10 rounded-xl p-1.5 pl-3.5"
                  >
                    <input
                      type="text"
                      placeholder={t.enterName}
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-500 outline-none flex-1 font-medium text-sm min-w-0"
                      maxLength={16}
                    />
                    <button
                      type="submit"
                      className="bg-white hover:bg-cyan-300 text-slate-950 rounded-lg px-4 py-2 font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 cursor-pointer font-display shrink-0"
                    >
                      {t.addPlayer}
                    </button>
                  </form>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  if (players.length < 3) {
                    playDelete();
                    showToast(t.minPlayersAlert);
                    return;
                  }
                  playTap();
                  setScreen('settings');
                }}
                className={`w-full py-4 rounded-2xl font-display font-bold text-xs tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                  players.length >= 3
                    ? 'bg-white text-slate-950 hover:bg-cyan-300 shadow-[0_10px_28px_rgba(255,255,255,0.12)]'
                    : 'bg-white/[0.05] text-slate-400 border border-white/10'
                }`}
              >
                <span>{t.continueBtn}</span>
                <span className="font-mono text-[11px] opacity-65">
                  ({players.length})
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN: SETTINGS */}
          {screen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col space-y-4 py-1"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
                  {t.settingsTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.settingsSubtitle}</p>
              </div>

              <div className="glass-panel rounded-[26px] p-4 sm:p-5 space-y-5">
                {/* Impostor Count */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-cyan-300 block">
                    {t.impostorsLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[1, 2].map((num) => {
                      const disabled = num > getMaxImpostors(players.length);
                      const active = settings.impostorCount === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            if (disabled) {
                              playDelete();
                              showToast(t.cantSelectImposter);
                              return;
                            }
                            playTap();
                            setSettings((prev) => ({ ...prev, impostorCount: num }));
                          }}
                          className={`py-3.5 px-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            active
                              ? 'bg-rose-500/20 border-rose-400 text-white shadow-[0_0_24px_rgba(244,63,94,0.2)]'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.07]'
                          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <span className="text-sm font-bold font-display uppercase">
                            {num}{' '}
                            {num === 1
                              ? 'Impostor'
                              : lang === 'pt'
                                ? 'Impostores'
                                : 'Impostors'}
                          </span>
                          {disabled && (
                            <span className="text-[9px] font-mono text-rose-300">
                              {t.minFivePlayers}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Level */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-cyan-300 block">
                    {t.difficultyLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'balanced', label: t.diffBalanced, desc: t.diffBalancedDesc },
                        { id: 'tactical', label: t.diffTactical, desc: t.diffTacticalDesc },
                        { id: 'mastermind', label: t.diffMastermind, desc: t.diffMastermindDesc }
                      ] as { id: DifficultyLevel; label: string; desc: string }[]
                    ).map((tier) => {
                      const active = settings.difficulty === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            playTap();
                            setSettings((prev) => ({ ...prev, difficulty: tier.id }));
                          }}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.07]'
                          }`}
                        >
                          <span className="text-xs font-bold font-display block">
                            {tier.label}
                          </span>
                          <span className="text-[9px] text-slate-400 leading-tight block mt-1">
                            {tier.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Voting Mode */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-cyan-300 block">
                    {t.votingModeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { id: 'group', label: t.votingGroup, desc: t.votingGroupDesc },
                        { id: 'individual', label: t.votingIndividual, desc: t.votingIndividualDesc }
                      ] as const
                    ).map((mode) => {
                      const active = settings.votingMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            playTap();
                            setSettings((prev) => ({ ...prev, votingMode: mode.id }));
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-indigo-500/20 border-indigo-400 text-white'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.07]'
                          }`}
                        >
                          <span className="text-xs font-bold font-display block">
                            {mode.label}
                          </span>
                          <span className="text-[10px] text-slate-400 leading-snug block mt-0.5">
                            {mode.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timer Duration */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-cyan-300 block">
                    {t.durationLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 5].map((mins) => {
                      const active = settings.timeMinutes === mins;
                      return (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => {
                            playTap();
                            setSettings((prev) => ({ ...prev, timeMinutes: mins }));
                          }}
                          className={`py-2.5 rounded-xl border font-bold font-mono text-xs transition-all cursor-pointer ${
                            active
                              ? 'bg-white text-slate-950 border-white'
                              : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          {mins}m
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Twists Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playTap();
                    setSettings((prev) => ({ ...prev, enableTwists: !prev.enableTwists }));
                  }}
                  className={`w-full p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                    settings.enableTwists
                      ? 'bg-amber-500/12 border-amber-400/35'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Zap
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        settings.enableTwists ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold font-display text-white block">
                        {t.twistsLabel}
                      </span>
                      <span className="text-[11px] text-slate-400 block leading-snug">
                        {t.twistsDesc}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full p-1 transition-colors shrink-0 ${
                      settings.enableTwists ? 'bg-amber-400' : 'bg-white/15'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.enableTwists ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={proceedToCategories}
                className="w-full py-4 rounded-2xl bg-white text-slate-950 hover:bg-cyan-300 font-bold font-display text-xs tracking-[0.18em] uppercase shadow-[0_10px_28px_rgba(255,255,255,0.12)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>{t.startRound}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN: CATEGORIES */}
          {screen === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col flex-1 min-h-0 space-y-3.5"
            >
              <div className="text-center space-y-1 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
                  {t.categoriesTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.categoriesSubtitle}</p>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1">
                {/* Random Mystery Category Card */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleSelectCategory('random')}
                  className="w-full rounded-2xl p-4 text-left border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 via-indigo-500/15 to-rose-500/20 hover:border-cyan-300/60 flex items-center justify-between gap-3 cursor-pointer transition-all"
                >
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>SURPRESA</span>
                    </div>
                    <h3 className="text-base font-bold font-display text-white">
                      {t.randomCategoryTitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-snug">
                      {t.randomCategoryDesc}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Shuffle className="w-6 h-6 text-cyan-300" />
                  </div>
                </motion.button>

                {/* Specific Categories */}
                {Object.values(CATEGORIES).map((cat) => (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full rounded-2xl p-4 text-left border border-white/10 hover:border-white/25 bg-gradient-to-r ${cat.color} flex items-center justify-between gap-3 cursor-pointer transition-all`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold font-display text-white truncate">
                          {cat.name[lang]}
                        </h3>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/35 text-slate-300 border border-white/10 shrink-0">
                          {cat.words.length} {t.wordsTag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300/85 leading-snug">
                        {cat.desc[lang]}
                      </p>
                    </div>
                    <div className="text-3xl sm:text-4xl shrink-0 select-none drop-shadow">
                      {cat.icon}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN: PASS & REVEAL */}
          {(screen === 'pass' || screen === 'reveal') && players[turnIndex] && (
            <motion.div
              key={`secret-flow-${screen}-${players[turnIndex].id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <SecretRevealFlow
                mode={screen}
                player={players[turnIndex]}
                playerIndex={turnIndex}
                totalPlayers={players.length}
                gameData={gameData}
                lang={lang}
                onReadyToReveal={() => setScreen('reveal')}
                onChangeCategory={() => setScreen('categories')}
                onAdvanceTurn={() => {
                  if (turnIndex < players.length - 1) {
                    setTurnIndex((prev) => prev + 1);
                    setScreen('pass');
                  } else {
                    handleStartTimer();
                  }
                }}
              />
            </motion.div>
          )}

          {/* SCREEN: DISCUSSION TIMER & STRATEGIC QUESTIONS */}
          {screen === 'timer' && (
            <motion.div
              key="discussion-timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <DiscussionTimerScreen
                gameData={gameData}
                startingPlayer={startingPlayer}
                timeLeft={timeLeft}
                totalTimeSeconds={settings.timeMinutes * 60}
                timerActive={timerActive}
                lang={lang}
                onToggleTimer={() => setTimerActive((prev) => !prev)}
                onStartVoting={handleStartVoting}
              />
            </motion.div>
          )}

          {/* SCREEN: VOTING (1 or 2 suspects + group or secret ballot) */}
          {screen === 'voting' && (
            <motion.div
              key="voting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col flex-1 min-h-0 w-full"
            >
              <VotingScreen
                players={players}
                impostorIds={gameData.impostors}
                votingMode={settings.votingMode}
                lang={lang}
                onChangeVotingMode={(mode) =>
                  setSettings((prev) => ({ ...prev, votingMode: mode }))
                }
                onCompleteVoting={handleCompleteVoting}
              />
            </motion.div>
          )}

          {/* SCREEN: RESULT */}
          {screen === 'result' && roundOutcome && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <ResultScreen
                players={players}
                gameData={gameData}
                outcome={roundOutcome}
                lang={lang}
                onPlayNewRound={() => setScreen('categories')}
                onGoHome={() => setScreen('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <HowToPlayModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        lang={lang}
      />

      <AvatarPicker
        isOpen={isAvatarModalOpen}
        onClose={finishEditingAvatar}
        selectedColor={avatarColor}
        selectedEmoji={avatarEmoji}
        onSelectColor={setAvatarColor}
        onSelectEmoji={setAvatarEmoji}
        lang={lang}
      />

      {/* Footer */}
      <footer className="relative z-10 py-2.5 pb-safe text-center text-[10px] font-mono tracking-[0.18em] text-slate-400 uppercase border-t border-white/[0.06] bg-[#07080f]/60 backdrop-blur-md shrink-0 select-none flex items-center justify-center gap-2">
        <span>CRIADO POR LUIZ JAQUES -</span>
        <a
          href="https://instagram.com/luizjaques23"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors font-bold"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-pink-400 shrink-0"
            aria-hidden="true"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span>LUIZJAQUES23</span>
        </a>
      </footer>
    </div>
  );
}
