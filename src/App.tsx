import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Globe, 
  Users, 
  Trash2, 
  Edit2, 
  Clock, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles, 
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

import { CATEGORIES } from './data/categories';
import { Player, ScreenType, GameSettings, GameData } from './types';
import HowToPlayModal from './components/HowToPlayModal';
import AvatarPicker, { AVATAR_COLORS, AVATAR_EMOJIS } from './components/AvatarPicker';
import { 
  playTap, 
  playDelete, 
  playReveal, 
  playTick, 
  playAlarm, 
  playVictory, 
  playDefeat, 
  setMuted, 
  getMuted 
} from './utils/audio';

// Let the user add the characters at the beginning as requested
const INITIAL_PLAYERS: Player[] = [];

const TRANSLATIONS = {
  pt: {
    title: "JOGO DO IMPOSTOR",
    subtitle: "Regras, Segredos e Intuição",
    playNow: "Jogar Agora",
    playersTitle: "MESA DO IMPOSTOR",
    playersSubtitle: "Adicione amigos para jogar (Mínimo: 3)",
    enterName: "Nome do jogador",
    addPlayer: "Adicionar",
    minPlayersAlert: "Adicione pelo menos 3 jogadores!",
    continueBtn: "CONTINUAR",
    playersCount: "Jogadores",
    settingsTitle: "REGRAS DA MESA",
    settingsSubtitle: "Defina como quer jogar esta rodada",
    impostorsLabel: "Quantidade de Impostores",
    durationLabel: "Tempo de Discussão",
    gameDifficulty: "Dificuldade / Modo de Jogo",
    startRound: "AVANÇAR PARA TEMAS",
    categoriesTitle: "SÃO 500+ TEMAS",
    categoriesSubtitle: "Escolha uma categoria para revelar os segredos",
    passTitle: "Passe o celular para",
    readyBtn: "SOU EU, ESTOU PRONTO",
    hideSecretPrompt: "Garanta que ninguém está espiando sua tela!",
    showWordBtn: "SEGREDO (TOCAR E MANTER)",
    showWordReleaseBtn: "SOLTE PARA ESCONDER",
    impostorAlert: "VOCÊ É O IMPOSTOR!",
    impostorHint: "Dica de Sobrevivência:",
    impostorDesc: "O segredo está oculto para você. Tente pescar o tema pelas palavras dos inocentes e aja com naturalidade!",
    innocentAlert: "Sua palavra é:",
    innocentDesc: "O Impostor recebeu apenas uma dica extremamente enigmática relacionada a isso.",
    hideBtn: "ESCONDER E CONTINUAR",
    timerTitle: "TEMPO DE PERGUNTAS!",
    timerSubtitle: "Faça perguntas uns aos outros para expor o farsante",
    timerPause: "PAUSAR",
    timerResume: "CONTINUAR",
    skipTimer: "VOTAR AGORA",
    votingTitle: "QUEM É O IMPOSTOR?",
    votingSubtitle: "Apontem os dedos! Quem gaguejou na explicação?",
    submitVote: "CONFIRMAR VOTO",
    resultTarget: "PEGARAM O IMPOSTOR! 🎉",
    resultFailure: "O IMPOSTOR ESCAPOU! 😈",
    resultTargetDesc: "Sensacional! Vocês descobriram a fraude a tempo.",
    resultFailureDesc: "O impostor enganou todos vocês e conquistou a rodada.",
    secretWordLabel: "A Palavra Secreta:",
    impostorNamesLabel: "O Farsante era:",
    playAgain: "JOGAR NOVAMENTE",
    explanationTitle: "Para entender as dicas:",
    explanationDesc: "O Impostor recebe apenas uma categoria geral e uma DICA muito sutil, enquanto os outros recebem a palavra exata. Sua missão é mentir, descobrir a palavra ideal ou se misturar nos discursos!",
    howToPlayTooltip: "Ver Como Jogar",
    cantSelectImposter: "Máximo de impostores excedido para o número de jogadores atuais. Adicione mais jogadores.",
    minutes: "Minutos",
    seconds: "Segundos",
    editAvatarTooltip: "Editar",
    emptyLobbyTitle: "LOBBY VAZIO",
    emptyLobbyDesc: "Adicione amigos utilizando o formulário abaixo! (Mínimo de 3 para poder jogar)"
  },
  en: {
    title: "JOGO DO IMPOSTOR",
    subtitle: "The Impostor Game",
    playNow: "Play Now",
    playersTitle: "IMPOSTOR PARTY",
    playersSubtitle: "Add friends to the match (Min: 3)",
    enterName: "Player name",
    addPlayer: "Add",
    minPlayersAlert: "Add at least 3 players to begin!",
    continueBtn: "CONTINUE",
    playersCount: "Players",
    settingsTitle: "TABLE RULES",
    settingsSubtitle: "Define settings for this round",
    impostorsLabel: "Number of Impostors",
    durationLabel: "Discussion Timer",
    gameDifficulty: "Difficulty / Mode",
    startRound: "PROCEED TO THEMES",
    categoriesTitle: "500+ THEMES",
    categoriesSubtitle: "Choose a category to reveal the secrets",
    passTitle: "Pass the device to",
    readyBtn: "I'M READY",
    hideSecretPrompt: "Make sure nobody is peeking at your screen!",
    showWordBtn: "SECRET (TAP AND HOLD)",
    showWordReleaseBtn: "RELEASE TO CONCEAL",
    impostorAlert: "YOU ARE THE IMPOSTOR!",
    impostorHint: "Survival Clue:",
    impostorDesc: "The word is hidden from you. Try to catch the theme using clues from other players and act natural!",
    innocentAlert: "Your word is:",
    innocentDesc: "The Impostor only received an extremely subtle clue related to this.",
    hideBtn: "CONCEAL & CONTINUE",
    timerTitle: "QUESTION TIME!",
    timerSubtitle: "Ask questions to one another to expose the fraud",
    timerPause: "PAUSE",
    timerResume: "RESUME",
    skipTimer: "VOTE NOW",
    votingTitle: "WHO\'S THE IMPOSTOR?",
    votingSubtitle: "Point fingers! Who stumbled during their answer?",
    submitVote: "SUBMIT VOTE",
    resultTarget: "CAUGHT THE IMPOSTOR! 🎉",
    resultFailure: "IMPOSTOR ESCAPED! 😈",
    resultTargetDesc: "Incredible! You pointed out the fake player.",
    resultFailureDesc: "The impostor successfully fooled everyone.",
    secretWordLabel: "Secret Word:",
    impostorNamesLabel: "The Fraud was:",
    playAgain: "PLAY ONCE MORE",
    explanationTitle: "Rules Overview:",
    explanationDesc: "The Impostor only gets a broad category & subtle hint. Everyone else gets the precise word. Blend in or expose the liar!",
    howToPlayTooltip: "How to play",
    cantSelectImposter: "Too many impostors! Add more players first to select this option.",
    minutes: "Minutes",
    seconds: "Seconds",
    editAvatarTooltip: "Customize",
    emptyLobbyTitle: "EMPTY LOBBY",
    emptyLobbyDesc: "Add friends using the form below! (Minimum of 3 to start)"
  }
};

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [mutedState, setMutedState] = useState<boolean>(false);
  
  // Players State
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  // Editing avatar state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const [avatarColor, setAvatarColor] = useState<string>('bg-[#007AFF]');
  const [avatarEmoji, setAvatarEmoji] = useState<string>('🧘‍♀️');

  // Rules Modal state
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);

  // Settings State
  const [settings, setSettings] = useState<GameSettings>({
    impostorCount: 1,
    timeMinutes: 2,
    language: 'pt'
  });

  // Active Game Data State
  const [gameData, setGameData] = useState<GameData>({
    categoryName: { pt: '', en: '' },
    secretWord: { pt: '', en: '' },
    secretHint: { pt: '', en: '' },
    impostors: []
  });

  const [turnIndex, setTurnIndex] = useState<number>(0);
  const [showWord, setShowWord] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [votedPlayerId, setVotedPlayerId] = useState<string | null>(null);
  const [startingPlayerId, setStartingPlayerId] = useState<string | null>(null);

  // PWA installation states
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallBtn(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    playTap();
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    setInstallPrompt(null);
    setShowInstallBtn(false);
  };

  const selectedTranslation = TRANSLATIONS[lang];
  const startingPlayer = players.find(p => p.id === startingPlayerId);

  // Sync Audio Muteness State with Local state
  useEffect(() => {
    setMuted(mutedState);
  }, [mutedState]);

  // Game timer ticking loop
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const nextVal = prev - 1;
          // Play tick-tocks in the final 10 seconds empty phase
          if (nextVal <= 10 && nextVal > 0) {
            playTick(true);
          } else if (nextVal % 2 === 0) {
            playTick(false);
          }
          if (nextVal === 0) {
            setTimerActive(false);
            playAlarm();
          }
          return nextVal;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Format countdown string
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Add a new player
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim().length === 0) return;

    // Pick random colors and emojis out of remaining pools or fallback cyclic
    const colIndex = players.length % AVATAR_COLORS.length;
    const emoIndex = players.length % AVATAR_EMOJIS.length;

    const newPlayer: Player = {
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: newPlayerName.trim().substring(0, 16),
      color: AVATAR_COLORS[colIndex],
      textColor: 'text-white',
      emoji: AVATAR_EMOJIS[emoIndex]
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
    playTap();
  };

  // Remove player from lobby
  const deletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    playDelete();
  };

  // Open the edit avatar picker modal for a player
  const startEditingAvatar = (player: Player) => {
    playTap();
    setEditingPlayerId(player.id);
    setAvatarColor(player.color);
    setAvatarEmoji(player.emoji);
    setIsAvatarModalOpen(true);
  };

  // Finish editing avatar
  const finishEditingAvatar = () => {
    if (editingPlayerId) {
      setPlayers(players.map(p => {
        if (p.id === editingPlayerId) {
          return { ...p, color: avatarColor, emoji: avatarEmoji };
        }
        return p;
      }));
    }
    setIsAvatarModalOpen(false);
    setEditingPlayerId(null);
  };

  // Initiate category selection
  const proceedToCategories = () => {
    if (players.length < 3) {
      alert(selectedTranslation.minPlayersAlert);
      playDelete();
      return;
    }
    playTap();
    setScreen('categories');
  };

  // Initiate game logic
  const handleSelectCategory = (categoryId: string) => {
    playTap();
    const cat = CATEGORIES[categoryId];
    
    // Choose a random word
    const randWordIdx = Math.floor(Math.random() * cat.words.length);
    const chosenWordObj = cat.words[randWordIdx];

    // Select the set of imposters randomly
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    // impostor count must be valid
    const actualImpostorCount = Math.min(settings.impostorCount, players.length - 2);
    const impostorIds = shuffled.slice(0, actualImpostorCount).map(p => p.id);

    setGameData({
      categoryName: cat.name,
      secretWord: chosenWordObj.word,
      secretHint: chosenWordObj.hint,
      impostors: impostorIds
    });

    setTurnIndex(0);
    setShowWord(false);
    setVotedPlayerId(null);
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
    setTimerActive(true);
    setScreen('timer');
  };

  const handleStartVoting = () => {
    playTap();
    setTimerActive(false);
    setScreen('voting');
  };

  const handleRevealVoteResult = () => {
    if (!votedPlayerId) return;
    
    // Check if we caught an imposter
    const caught = gameData.impostors.includes(votedPlayerId);
    if (caught) {
      playVictory();
    } else {
      playDefeat();
    }
    setScreen('result');
  };

  // Grid style variables with different exciting color profiles for each screen
  const getScreenBackground = () => {
    switch (screen) {
      case 'home':
        return {
          background: 'radial-gradient(circle at 10% 20%, #15103a 0%, #060512 100%), radial-gradient(circle at 90% 80%, #4c007d 0%, transparent 55%)'
        };
      case 'players':
        return {
          background: 'radial-gradient(circle at 80% 10%, #0c183a 0%, #030612 100%), radial-gradient(circle at 10% 90%, #02385c 0%, transparent 60%)'
        };
      case 'settings':
        return {
          background: 'radial-gradient(circle at 15% 85%, #2a0b38 0%, #080310 100%), radial-gradient(circle at 85% 15%, #182b4f 0%, transparent 60%)'
        };
      case 'categories':
        return {
          background: 'radial-gradient(circle at 50% 10%, #100f35 0%, #040410 100%), radial-gradient(circle at 50% 90%, #3e125c 0%, transparent 60%)'
        };
      case 'pass':
        return {
          background: 'radial-gradient(circle at 10% 20%, #2e082c 0%, #09020a 100%), radial-gradient(circle at 90% 80%, #0b2245 0%, transparent 55%)'
        };
      case 'reveal':
        return {
          background: 'radial-gradient(circle at 90% 10%, #220a3a 0%, #07020d 100%), radial-gradient(circle at 10% 90%, #0e2942 0%, transparent 55%)'
        };
      case 'timer':
        return {
          background: 'radial-gradient(circle at 15% 50%, #3d0714 0%, #0f0205 100%), radial-gradient(circle at 85% 50%, #032b35 0%, transparent 60%)'
        };
      case 'voting':
        return {
          background: 'radial-gradient(circle at 50% 10%, #3a0026 0%, #0a000b 100%), radial-gradient(circle at 50% 90%, #0d254c 0%, transparent 60%)'
        };
      case 'result': {
        const isImpostorCaught = votedPlayerId ? gameData.impostors.includes(votedPlayerId) : false;
        if (isImpostorCaught) {
          return {
            background: 'radial-gradient(circle at 20% 20%, #033a25 0%, #01120b 100%), radial-gradient(circle at 80% 80%, #024b55 0%, transparent 55%)'
          };
        } else {
          return {
            background: 'radial-gradient(circle at 20% 20%, #4e0310 0%, #120104 100%), radial-gradient(circle at 80% 80%, #3b012c 0%, transparent 55%)'
          };
        }
      }
      default:
        return {
          background: 'radial-gradient(circle at 0% 0%, #1a1b2e 0%, #0d0d12 100%), radial-gradient(circle at 100% 100%, #2d1b33 0%, transparent 50%)'
        };
    }
  };

  const getGlowColors = () => {
    switch (screen) {
      case 'home':
        return { top: 'bg-indigo-500/25', bottom: 'bg-pink-500/25' };
      case 'players':
        return { top: 'bg-cyan-500/25', bottom: 'bg-indigo-500/25' };
      case 'settings':
        return { top: 'bg-purple-500/25', bottom: 'bg-pink-500/25' };
      case 'categories':
        return { top: 'bg-violet-500/25', bottom: 'bg-emerald-500/20' };
      case 'pass':
        return { top: 'bg-fuchsia-500/25', bottom: 'bg-indigo-500/25' };
      case 'reveal':
        return { top: 'bg-purple-500/25', bottom: 'bg-cyan-500/25' };
      case 'timer':
        return { top: 'bg-red-500/25', bottom: 'bg-cyan-500/25' };
      case 'voting':
        return { top: 'bg-pink-500/25', bottom: 'bg-purple-500/25' };
      case 'result': {
        const isImpostorCaught = votedPlayerId ? gameData.impostors.includes(votedPlayerId) : false;
        if (isImpostorCaught) {
          return { top: 'bg-emerald-500/30', bottom: 'bg-teal-400/30' };
        } else {
          return { top: 'bg-red-500/30', bottom: 'bg-fuchsia-500/30' };
        }
      }
      default:
        return { top: 'bg-indigo-500/20', bottom: 'bg-purple-500/20' };
    }
  };

  const glows = getGlowColors();

  return (
    <div 
      className="min-h-screen text-white font-sans flex flex-col justify-between transition-all duration-700 overflow-x-hidden relative immersive-bg"
      style={getScreenBackground()}
    >
      {/* Starry Dot Grid background overlay */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none z-0"></div>

      {/* Decorative Aurora glow effects - HIGHLY COLORFUL DYNAMIC ORBS */}
      <div className={`absolute top-[-25%] left-[-15%] w-[70%] h-[55%] rounded-full ${glows.top} blur-[140px] pointer-events-none transition-all duration-1000`}></div>
      <div className={`absolute bottom-[-15%] right-[-15%] w-[60%] h-[55%] rounded-full ${glows.bottom} blur-[140px] pointer-events-none transition-all duration-1000`}></div>

      {/* Global Header */}
      <header className="relative z-20 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/15 backdrop-blur-md">
        <button
          onClick={() => {
            playTap();
            if (screen === 'home') return;
            if (screen === 'players') setScreen('home');
            else if (screen === 'settings') setScreen('players');
            else if (screen === 'categories') setScreen('settings');
            else if (screen === 'pass') setScreen('categories');
            else if (screen === 'reveal') setScreen('pass');
            else if (screen === 'timer') setScreen('categories');
            else if (screen === 'voting') setScreen('timer');
            else if (screen === 'result') setScreen('home');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold transition-all border border-white/15 cursor-pointer font-display tracking-widest ${screen === 'home' || screen === 'pass' || screen === 'reveal' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>VOLTAR</span>
        </button>

        {/* LOGO IN CENTRAL HEADER - ABSOLUTELY CENTERED FOR FLUID MOBILE DESIGN */}
        <div 
          onClick={() => {
            playTap();
            setScreen('home');
          }}
          className="absolute left-1/2 -translate-x-1/2 text-sm sm:test-base md:text-lg font-black font-display tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] select-none whitespace-nowrap active:opacity-95"
        >
          JOGO DO IMPOSTOR
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Help Modal toggle button */}
          <button
            onClick={() => {
              playTap();
              setIsRulesModalOpen(true);
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5 cursor-pointer"
            title={selectedTranslation.howToPlayTooltip}
          >
            <HelpCircle className="w-5 h-5 text-purple-400" />
          </button>
        </div>
      </header>

      {/* Main Container with Screen Transitions */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-6 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          
          {/* SCREEN: HOME */}
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center text-center py-6 space-y-8"
            >
              {/* Animated Giant Logo */}
              <div className="relative">
                {/* Backdrop glowing sphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-600/35 blur-3xl animate-pulse-glow"></div>
                
                <motion.div
                  initial={{ rotate: -1.5 }}
                  animate={{ rotate: 1.5 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, ease: 'easeInOut' }}
                  className="relative z-10 flex flex-col"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white drop-shadow-[0_4px_24px_rgba(99,102,241,0.5)] leading-tight">
                    JOGO DO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">IMPOSTOR</span>
                  </span>
                  <div className="mt-2.5 flex items-center justify-center gap-1 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 font-display">
                      {selectedTranslation.subtitle}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Character grid snippet for design rhythm */}
              <div className="flex items-center gap-3.5 py-4 select-none relative">
                <div className="absolute inset-0 border-y border-white/5 py-8 scale-x-110 pointer-events-none"></div>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🧘‍♀️</span>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🧟‍♂️</span>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🦸‍♂️</span>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎸</span>
              </div>

              {/* Instructions overview to fill container gracefully */}
              <div className="w-full glass-panel-glow-indigo max-w-sm rounded-[30px] p-6 text-left shadow-2xl relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-[25px] pointer-events-none"></div>
                <h3 className="text-xs font-extrabold uppercase text-indigo-400 mb-1.5 flex items-center gap-1.5 font-display tracking-wider">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  {selectedTranslation.explanationTitle}
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                  {selectedTranslation.explanationDesc}
                </p>
              </div>

              {/* PWA App Installation Guidance Card */}
              <div className="w-full max-w-sm rounded-[24px] p-4 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-black/40 border border-indigo-500/20 shadow-xl relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/15 rounded-full blur-[40px] pointer-events-none"></div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl shrink-0">
                    📲
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-purple-400 tracking-[0.15em] uppercase block font-display">INSTALAR NO CELULAR (PWA)</span>
                    <span className="text-[11px] text-slate-300 font-sans font-medium mt-0.5 block leading-relaxed">
                      Jogue em tela cheia como um aplicativo de verdade sem barras no Android e iPhone!
                    </span>
                  </div>
                </div>

                {showInstallBtn ? (
                  <button
                    onClick={handleInstallClick}
                    className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>INSTALAR AGORA</span>
                  </button>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                    <div className="text-[10px] text-indigo-300 flex items-start gap-1.5 leading-tight bg-white/[0.02] rounded-lg p-2">
                      <span className="text-base leading-none">🤖</span>
                      <div>
                        <strong className="block text-white mb-0.5">Android:</strong>
                        Toque em <span className="text-indigo-400 font-bold">⋮</span> e escolha <span className="text-indigo-400 font-bold">Instalar</span>.
                      </div>
                    </div>
                    <div className="text-[10px] text-purple-300 flex items-start gap-1.5 leading-tight bg-white/[0.02] rounded-lg p-2">
                      <span className="text-base leading-none">🍎</span>
                      <div>
                        <strong className="block text-white mb-0.5">iPhone:</strong>
                        Toque em <span className="text-purple-400 font-bold">Compartilhar</span> e depois em <span className="text-purple-400 font-bold">Adicionar</span>.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Game Launch Control - Styled like the 'Initiate Jump' button */}
              <button
                onClick={() => {
                  playTap();
                  setScreen('players');
                }}
                className="w-full max-w-sm py-4.5 rounded-2xl bg-white text-black font-extrabold font-display text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Play className="w-4.5 h-4.5 fill-current" />
                <span>{selectedTranslation.playNow}</span>
              </button>
            </motion.div>
          )}

          {/* SCREEN: PLAYERS */}
          {screen === 'players' && (
            <motion.div
              key="players"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-[75vh]"
            >
              {/* Label Title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white uppercase">
                  {selectedTranslation.playersTitle}
                </h2>
                <p className="text-[10px] text-gray-400 mt-2 font-bold bg-white/5 inline-block px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider font-mono">
                  {selectedTranslation.playersSubtitle}
                </p>
              </div>

              {/* Lobby Card */}
              <div className="flex-1 glass-panel rounded-[30px] flex flex-col overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-[45px] pointer-events-none"></div>
                
                {/* Setup list Container */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-2.5">
                  {players.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-4 h-full">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse shadow-inner shadow-indigo-500/10">
                        <Users className="w-8 h-8 text-indigo-400/80" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-extrabold text-sm text-white uppercase tracking-widest font-display">
                          {selectedTranslation.emptyLobbyTitle}
                        </p>
                        <p className="text-xs text-indigo-200/50 max-w-[260px] font-sans leading-relaxed">
                          {selectedTranslation.emptyLobbyDesc}
                        </p>
                      </div>
                    </div>
                  ) : (
                    players.map((p) => (
                      <div 
                        key={p.id} 
                        className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 text-white rounded-2xl p-3 pl-4 pr-3 flex justify-between items-center group transition-all hover:from-white/10 hover:to-white/5 hover:border-white/20 shadow-md relative overflow-hidden shrink-0"
                      >
                        {/* Elegant colored streak matching user avatar color */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${p.color}`} />

                        <div className="flex items-center gap-3 relative z-10 pl-1">
                          <div 
                            onClick={() => startEditingAvatar(p)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.color} text-lg shadow-inner cursor-pointer hover:scale-105 transition-transform border border-white/10`}
                            title={selectedTranslation.editAvatarTooltip}
                          >
                            {p.emoji}
                          </div>
                          <span className="font-extrabold text-sm tracking-wide font-display">{p.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => startEditingAvatar(p)}
                            className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
                            title={selectedTranslation.editAvatarTooltip}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={() => deletePlayer(p.id)} 
                            className="text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-950/20 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Remover"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Fixed quick add box in the bottom footer */}
                <div className="p-4 border-t border-white/10 bg-black/10 backdrop-blur-md">
                  <form onSubmit={handleAddPlayer} className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 pl-4">
                    <input 
                      type="text" 
                      placeholder={selectedTranslation.enterName} 
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-500 outline-none flex-1 font-semibold text-sm font-sans"
                      maxLength={14}
                    />
                    <button 
                      type="submit" 
                      className="bg-white hover:bg-indigo-600 hover:text-white text-black rounded-lg px-5 py-2.5 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer whitespace-nowrap font-display"
                    >
                      {selectedTranslation.addPlayer}
                    </button>
                  </form>
                </div>
              </div>

              {/* Lobby footer validation action - Styled like premium jump controls */}
              <div className="mt-4">
                <button 
                  onClick={() => {
                    if (players.length < 3) {
                      playDelete();
                      alert(selectedTranslation.minPlayersAlert);
                      return;
                    }
                    playTap();
                    setScreen('settings');
                  }}
                  className={`w-full bg-white hover:bg-indigo-600 hover:text-white text-black font-extrabold font-display text-xs tracking-[0.2em] py-4.5 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.1)] flex justify-center items-center gap-2 transition-transform active:scale-98 cursor-pointer uppercase`}
                >
                  <span>{selectedTranslation.continueBtn}</span>
                  <span className="font-mono text-xs opacity-60">| {players.length} {selectedTranslation.playersCount}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: SETTINGS */}
          {screen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white uppercase font-display">
                  {selectedTranslation.settingsTitle}
                </h2>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider font-mono">
                  {selectedTranslation.settingsSubtitle}
                </p>
              </div>

              <div className="glass-panel rounded-[30px] p-6 space-y-6 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-[45px] pointer-events-none"></div>

                {/* Number of Imposters Slider/Pills */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 block pb-1.5 border-b border-white/5 font-display">
                    {selectedTranslation.impostorsLabel}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2].map((num) => {
                      const disabled = num === 2 && players.length < 5;
                      const active = settings.impostorCount === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            if (disabled) {
                              playDelete();
                              alert(selectedTranslation.cantSelectImposter);
                              return;
                            }
                            playTap();
                            setSettings({ ...settings, impostorCount: num });
                          }}
                          className={`flex-1 py-4.5 rounded-xl border font-extrabold text-xs tracking-wider transition-all uppercase flex flex-col items-center justify-center gap-1.5 cursor-pointer font-display
                            ${active 
                              ? 'bg-purple-500/20 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]' 
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                            }
                            ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
                          `}
                        >
                          <span className="text-base font-black font-display">{num} {num === 1 ? (lang === 'pt' ? 'Impostor' : 'Impostor') : (lang === 'pt' ? 'Impostores' : 'Impostors')}</span>
                          {disabled && <span className="text-[9px] text-red-400/80 font-mono">(MÍN: 5 JOGADORES)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Discussion Timer minutes pills */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 block pb-1.5 border-b border-white/5 font-display">
                    {selectedTranslation.durationLabel}
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
                            setSettings({ ...settings, timeMinutes: mins });
                          }}
                          className={`py-3.5 rounded-xl border font-extrabold text-xs tracking-wider transition-all cursor-pointer font-display
                            ${active 
                              ? 'bg-pink-500/20 border-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.25)]' 
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                            }
                          `}
                        >
                          {mins}m
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gameplay difficulty or visual cue */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-extrabold text-[10px] text-amber-400 uppercase tracking-widest block font-display">MODO HARDCORE ATIVO</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                        As pistas recebidas pelo Impostor são absurdamente vagas para fazê-lo suar frio nas explicações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={proceedToCategories}
                  className="w-full py-4.5 rounded-2xl bg-white text-black font-extrabold font-display text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{selectedTranslation.startRound}</span>
                  <ChevronRight className="w-4 h-4 text-current" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: CATEGORIES */}
          {screen === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-[75vh]"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white leading-none uppercase">
                  {selectedTranslation.categoriesTitle}
                </h2>
                <p className="text-[10px] text-gray-400 mt-2.5 font-bold bg-white/5 inline-block px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider font-mono">
                  {selectedTranslation.categoriesSubtitle}
                </p>
              </div>

              {/* Grid of beautiful visual cards */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectCategory(key)}
                    className={`w-full rounded-2xl p-5 text-left border border-white/10 relative overflow-hidden transition-all duration-200 active:scale-98 flex items-center gap-4 bg-gradient-to-r hover:border-white/20 shadow-lg group cursor-pointer ${cat.color}`}
                  >
                    {/* Shiny overlay on hovered card */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[35px] pointer-events-none -mr-12 -mt-12"></div>
                    
                    <div className="flex-1 relative z-10">
                      <h3 className="text-xl font-bold font-display text-white tracking-wide mb-1 leading-snug">
                        {cat.name[lang]}
                      </h3>
                      <p className="text-xs text-white/80 font-medium leading-relaxed font-sans max-w-[240px]">
                        {cat.desc[lang]}
                      </p>
                    </div>

                    <div className="text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] relative z-10 shrink-0 select-none">
                      {cat.icon}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN: PASS THE PHONE */}
          {screen === 'pass' && (
            <motion.div
              key="pass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center space-y-8 py-8"
            >
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
                {selectedTranslation.passTitle}
              </h2>
              
              {/* Animated Bouncy Device avatar frame with concentric orbits */}
              <div className="relative py-4 w-52 h-52 flex items-center justify-center mx-auto">
                <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none animate-pulse"></div>
                <div className="absolute inset-2 border border-dashed border-indigo-500/15 rounded-full pointer-events-none"></div>
                <div className="absolute inset-6 border border-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none animate-pulse-glow"></div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className={`w-36 h-36 mx-auto ${players[turnIndex].color} rounded-2xl flex items-center justify-center shadow-2xl text-6xl relative select-none border border-white/20 z-10`}
                >
                  <span className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)]">{players[turnIndex].emoji}</span>
                </motion.div>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md font-display uppercase">
                  {players[turnIndex].name}
                </h1>
              </div>

              <button 
                onClick={() => {
                  playTap();
                  setScreen('reveal');
                }}
                className="w-full max-w-sm py-4 rounded-xl bg-white text-black font-extrabold font-display text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95 cursor-pointer"
              >
                {selectedTranslation.readyBtn}
              </button>
            </motion.div>
          )}

          {/* SCREEN: REVEAL SECRET */}
          {screen === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-6"
            >
              <AnimatePresence mode="wait">
                {!showWord ? (
                  // STATE 1: PEER WARNING BEFORE HOLDING BTN
                  <motion.div
                    key="pre-reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center w-full max-w-sm space-y-8 flex flex-col items-center"
                  >
                    <div className={`w-32 h-32 mx-auto ${players[turnIndex].color} rounded-2xl flex items-center justify-center text-6xl shadow-xl select-none border border-white/10`}>
                      👀
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-3xl font-extrabold font-display uppercase">{players[turnIndex].name}</h2>
                      <p className="text-xs text-slate-405 font-medium leading-relaxed font-sans px-4">
                        {selectedTranslation.hideSecretPrompt}
                      </p>
                    </div>

                    {/* TAP AND HOLD MODERN GESTURE TRIGGER */}
                    <button 
                      onPointerDown={() => {
                        playReveal();
                        setShowWord(true);
                      }}
                      onMouseDown={() => {
                        playReveal();
                        setShowWord(true);
                      }}
                      className="w-full bg-gradient-to-tr from-indigo-600/90 via-purple-600/90 to-pink-600/90 hover:from-indigo-600 hover:to-pink-600 text-white font-extrabold font-display py-14 rounded-2xl border border-white/15 shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all text-xs uppercase tracking-[0.25em] cursor-pointer select-none relative overflow-hidden group active:scale-98"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-pulse pointer-events-none"></div>
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span>{selectedTranslation.showWordBtn}</span>
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  // STATE 2: THE ACTUAL SECRET (Imposter vs Innocent)
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-sm space-y-6"
                    onPointerUp={() => setShowWord(false)}
                    onMouseUp={() => setShowWord(false)}
                  >
                    {gameData.impostors.includes(players[turnIndex].id) ? (
                      // IMPOSTOR CARD SEEN
                      <div className="glass-panel-glow-red border border-red-500/30 p-8 rounded-[30px] text-center shadow-3xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[45px] pointer-events-none"></div>
                        
                        <div className="text-7xl animate-pulse select-none">😈</div>
                        
                        <div className="space-y-1">
                          <h2 className="text-2xl font-extrabold font-display text-red-400 tracking-wide uppercase">
                            {selectedTranslation.impostorAlert}
                          </h2>
                          <p className="text-[10px] text-red-300 font-bold uppercase tracking-widest font-mono">
                            {gameData.categoryName[lang]}
                          </p>
                        </div>

                        <div className="bg-black/40 p-5.5 rounded-xl border border-red-500/20 shadow-inner">
                          <p className="text-[9px] text-red-400 uppercase font-black tracking-widest mb-1.5 font-mono">
                            {selectedTranslation.impostorHint}
                          </p>
                          <p className="text-2xl font-extrabold text-white italic tracking-wide font-display">
                            "{gameData.secretHint[lang]}"
                          </p>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          {selectedTranslation.impostorDesc}
                        </p>
                      </div>
                    ) : (
                      // INNOCENT CARD SEEN
                      <div className="glass-panel-glow-indigo border border-indigo-500/30 p-8 rounded-[30px] text-center shadow-3xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[45px] pointer-events-none"></div>

                        <div className="text-7xl select-none">🤫</div>

                        <div className="space-y-1">
                          <h2 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                            {selectedTranslation.innocentAlert}
                          </h2>
                          <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest font-mono">
                            {gameData.categoryName[lang]}
                          </p>
                        </div>

                        <div className="bg-black/40 p-6.5 rounded-xl border border-indigo-500/20 shadow-inner">
                          <p className="text-3xl font-extrabold text-white tracking-wider font-display">
                            {gameData.secretWord[lang]}
                          </p>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          {selectedTranslation.innocentDesc}
                        </p>
                      </div>
                    )}

                    {/* Instruction helper showing tap to hide */}
                    <div className="text-center font-bold text-[10px] text-indigo-300/80 uppercase animate-pulse tracking-widest font-mono select-none">
                      {selectedTranslation.showWordReleaseBtn}
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering pointerUp release toggle
                        playTap();
                        setShowWord(false);
                        if (turnIndex < players.length - 1) {
                          setTurnIndex(prev => prev + 1);
                          setScreen('pass');
                        } else {
                          handleStartTimer();
                        }
                      }}
                      className="w-full bg-white hover:bg-gray-100 text-black font-extrabold py-4 text-xs font-display tracking-[0.2em] rounded-xl transition-all active:scale-95 uppercase cursor-pointer"
                    >
                      {selectedTranslation.hideBtn}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* SCREEN: GAME ONGOING TIMER */}
          {screen === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center space-y-10 py-6"
            >
              {/* Title indicators */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/15 rounded-full border border-indigo-500/20">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 font-mono">
                    {gameData.categoryName[lang]}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white leading-none uppercase">
                  {selectedTranslation.timerTitle}
                </h2>
                <p className="text-xs text-slate-400 font-sans tracking-wide">
                  {selectedTranslation.timerSubtitle}
                </p>
              </div>

              {startingPlayer && (
                <div className="w-full max-w-sm p-5 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 relative overflow-hidden backdrop-blur-md shadow-lg shadow-emerald-950/20 animate-pulse-glow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-center gap-4.5 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/10 ${startingPlayer.color} shadow-lg shadow-black/25 transform rotate-3`}>
                      {startingPlayer.emoji}
                    </div>
                    <div className="text-left flex-1">
                      <span className="text-[9px] font-black text-emerald-400 tracking-[0.2em] uppercase block font-display">👉 QUEM COMEÇA:</span>
                      <span className="text-[17px] font-black text-white uppercase font-display tracking-wide block drop-shadow-md">{startingPlayer.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal Radial Countdown card UI */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Orbital concentric rings */}
                <div className={`absolute inset-0 border border-white/5 rounded-full transition-all duration-[800ms] ${timerActive ? 'scale-110 opacity-100' : 'scale-100 opacity-40'}`}></div>
                <div className={`absolute inset-4 border border-dashed border-indigo-500/15 rounded-full transition-all duration-[800ms] delay-150 ${timerActive ? 'scale-115 opacity-60' : 'scale-100 opacity-20'}`}></div>
                <div className="absolute inset-8 border border-white/5 rounded-full"></div>

                <div className="relative z-10 w-44 h-44 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(99,102,241,0.15)]">
                  {/* Subtle timer icon */}
                  <Clock className={`w-4 h-4 text-gray-400 mb-1.5 ${timerActive ? 'animate-spin-slow' : ''}`} />
                  
                  {/* Precise Time Label */}
                  <span className="text-3xl font-extrabold font-mono tracking-tighter text-white">
                    {formatTime(timeLeft)}
                  </span>
                  
                  {/* Mini suffix */}
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black font-mono mt-0.5">
                    {timeLeft > 60 ? selectedTranslation.minutes : selectedTranslation.seconds}
                  </span>
                </div>
              </div>

              {/* Timer interactive buttons */}
              <div className="w-full max-w-sm flex gap-3">
                <button 
                  onClick={() => {
                    playTap();
                    setTimerActive(!timerActive);
                  }}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs py-4.5 rounded-xl transition-colors border border-white/10 uppercase tracking-widest font-display cursor-pointer"
                >
                  {timerActive ? selectedTranslation.timerPause : selectedTranslation.timerResume}
                </button>
                
                <button 
                  onClick={handleStartVoting}
                  className="flex-1 bg-white hover:bg-gray-100 text-black font-black text-xs py-4.5 rounded-xl shadow-xl uppercase tracking-widest font-display transition-all active:scale-95 cursor-pointer"
                >
                  {selectedTranslation.skipTimer}
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: VOTING */}
          {screen === 'voting' && (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-[75vh]"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white leading-none uppercase">
                  {selectedTranslation.votingTitle}
                </h2>
                <p className="text-[10px] text-gray-400 mt-2.5 font-bold bg-white/5 inline-block px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider font-mono">
                  {selectedTranslation.votingSubtitle}
                </p>
              </div>

              {/* Voting Grid Selection of Players */}
              <div className="flex-1 glass-panel rounded-[30px] p-5 overflow-y-auto relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-[45px] pointer-events-none"></div>
                <div className="grid grid-cols-2 gap-3.5">
                  {players.map((p) => {
                    const isSelected = votedPlayerId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          playTap();
                          setVotedPlayerId(p.id);
                        }}
                        className={`relative rounded-2xl p-4 flex flex-col items-center justify-end min-h-[160px] overflow-hidden transition-all duration-300 border cursor-pointer select-none group
                          ${p.color} ${isSelected ? 'ring-4 ring-white border-white scale-96 shadow-2xl' : 'border-white/10 hover:scale-[1.03] shadow-md'}
                        `}
                      >
                        {/* Diagonal glow shine */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/15 rounded-full -mr-8 -mt-8 blur-lg pointer-events-none"></div>

                        {/* Centered large Avatar icon */}
                        <div className="absolute top-5 text-5xl drop-shadow-lg transform transition-transform group-hover:scale-110">
                          {p.emoji}
                        </div>

                        {/* Title pill */}
                        <span className="relative z-10 w-full mt-14 py-1.5 px-3 rounded-xl bg-black/40 text-white font-extrabold text-xs text-center truncate backdrop-blur-sm shadow-sm font-display">
                          {p.name}
                        </span>

                        {/* Top check label */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-white text-black rounded-lg w-6 h-6 flex items-center justify-center font-black text-xs shadow-md border border-white/30 font-mono">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trigger Submit Vote */}
              <div className="mt-4">
                <button 
                  onClick={handleRevealVoteResult}
                  disabled={!votedPlayerId}
                  className={`w-full py-4 rounded-xl font-display font-extrabold text-xs tracking-[0.2em] uppercase transition-all
                    ${votedPlayerId 
                      ? 'bg-white text-black hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-98 shadow-xl cursor-pointer' 
                      : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                    }
                  `}
                >
                  {selectedTranslation.submitVote}
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: GAME ROUND RESULTS */}
          {screen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center space-y-8 py-4 animate-transition"
            >
              {(() => {
                const isImpostorCaught = votedPlayerId ? gameData.impostors.includes(votedPlayerId) : false;
                const convictedPlayers = players.filter(p => gameData.impostors.includes(p.id));

                return (
                  <div className="w-full max-w-sm space-y-8 glass-panel rounded-[30px] p-8 shadow-3xl text-center relative overflow-hidden backdrop-blur-md">
                    {/* Glowing colored aura background */}
                    <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-[65px] pointer-events-none -mr-12 -mt-12 opacity-60 ${isImpostorCaught ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}></div>

                    <div className="text-[6.5rem] select-none leading-none pt-4 drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]">
                      {isImpostorCaught ? '🎉' : '😈'}
                    </div>

                    <div className="space-y-2">
                      <h1 className={`text-2xl font-extrabold font-display tracking-wide uppercase ${isImpostorCaught ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isImpostorCaught ? selectedTranslation.resultTarget : selectedTranslation.resultFailure}
                      </h1>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium px-2">
                        {isImpostorCaught ? selectedTranslation.resultTargetDesc : selectedTranslation.resultFailureDesc}
                      </p>
                    </div>

                    {/* Word revealing details metrics */}
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      
                      <div className="bg-black/35 rounded-xl p-4.5 border border-white/5 shadow-inner">
                        <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block mb-1 font-mono">
                          {selectedTranslation.secretWordLabel}
                        </span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 font-display tracking-wider">
                          {gameData.secretWord[lang]}
                        </span>
                      </div>
                      
                      <div className="bg-black/35 rounded-xl p-4.5 border border-white/5 shadow-inner">
                        <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block mb-2.5 font-mono">
                          {selectedTranslation.impostorNamesLabel}
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {convictedPlayers.map((imp) => (
                            <span 
                              key={imp.id} 
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold text-white ${imp.color} shadow-sm border border-white/15`}
                            >
                              <span>{imp.emoji}</span>
                              <span className="font-display uppercase tracking-wider text-[10px]">{imp.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Return back home controller */}
                    <button 
                      onClick={() => {
                        playTap();
                        setScreen('home');
                      }}
                      className="w-full bg-white hover:bg-indigo-600 hover:text-white text-black font-extrabold py-4 text-xs font-display tracking-[0.2em] rounded-xl shadow-xl mt-6 transition-all active:scale-95 uppercase cursor-pointer"
                    >
                      {selectedTranslation.playAgain}
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Modals container */}
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

      {/* Humble Footer note */}
      <footer className="relative z-10 py-5 text-center text-[9px] font-mono tracking-[0.25em] text-indigo-400/30 uppercase border-t border-white/10 bg-black/10 backdrop-blur-md shrink-0 select-none">
        CRIADO POR L.J 🔒
      </footer>
    </div>
  );
}
