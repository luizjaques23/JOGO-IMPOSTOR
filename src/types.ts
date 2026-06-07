export interface Player {
  id: string;
  name: string;
  color: string; // Tailwind class background
  textColor: string; // Tailwind text color matching or white
  emoji: string;
}

export interface WordItem {
  word: {
    pt: string;
    en: string;
  };
  hint: {
    pt: string;
    en: string;
  };
}

export interface Category {
  id: string;
  name: {
    pt: string;
    en: string;
  };
  icon: string;
  desc: {
    pt: string;
    en: string;
  };
  color: string;
  words: WordItem[];
}

export interface GameSettings {
  impostorCount: number;
  timeMinutes: number;
  language: 'pt' | 'en';
}

export interface GameData {
  categoryName: {
    pt: string;
    en: string;
  };
  secretWord: {
    pt: string;
    en: string;
  };
  secretHint: {
    pt: string;
    en: string;
  };
  impostors: string[]; // List of Player IDs
}

export type ScreenType = 'home' | 'players' | 'settings' | 'categories' | 'pass' | 'reveal' | 'timer' | 'voting' | 'result';
