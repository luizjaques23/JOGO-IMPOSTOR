import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { playTap } from '../utils/audio';

interface AvatarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  selectedEmoji: string;
  onSelectColor: (color: string) => void;
  onSelectEmoji: (emoji: string) => void;
  lang: 'pt' | 'en';
}

export const AVATAR_COLORS = [
  'bg-[#FF3B30]', // Red
  'bg-[#FF9500]', // Orange
  'bg-[#FFCC00]', // Yellow
  'bg-[#34C759]', // Green
  'bg-[#5AC8FA]', // Teal 
  'bg-[#007AFF]', // Blue
  'bg-[#FF2D55]', // Pink
  'bg-[#AF52DE]', // Purple
  'bg-[#8E8E93]'  // Slate
];

export const AVATAR_EMOJIS = [
  '🧘‍♀️', '🎸', '🕺', '🎧', '🦸‍♂️', '🧙‍♀️', '🧟‍♂️', '🧛‍♀️',
  '🐱', '🐶', '🦊', '🐻', '🐼', '🐨', '🦄', '🦖',
  '🐸', '🐙', '👾', '🚀', '🛸', '🍕', '🍔', '🌮',
  '⚽', '🏀', '🎮', '💡', '🔥', '👑', '💎', '💀'
];

export default function AvatarPicker({
  isOpen,
  onClose,
  selectedColor,
  selectedEmoji,
  onSelectColor,
  onSelectEmoji,
  lang
}: AvatarPickerProps) {
  
  const text = {
    pt: {
      title: 'Customizar Avatar',
      subtitle: 'Escolha seu estilo visual e emoji',
      colors: 'Cor do Fundo:',
      emojis: 'Emoji do Personagem:',
      done: 'Salvar'
    },
    en: {
      title: 'Customize Avatar',
      subtitle: 'Pick your background color and icon',
      colors: 'Background Color:',
      emojis: 'Character Emoji:',
      done: 'Save'
    }
  };

  const active = text[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playTap();
              onClose();
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-sm bg-[#1E1E22] border border-white/10 rounded-[35px] shadow-3xl text-white flex flex-col p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-xl font-black font-display text-white">{active.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{active.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 text-gray-300 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Color Grid */}
            <div className="mb-5">
              <label className="text-xs uppercase tracking-wider font-extrabold text-gray-400 block mb-2">{active.colors}</label>
              <div className="grid grid-cols-5 gap-2.5">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      playTap();
                      onSelectColor(color);
                    }}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 relative ${color}`}
                  >
                    {selectedColor === color && (
                      <div className="bg-black/40 rounded-full p-0.5 text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Grid */}
            <div className="mb-6 flex-1 overflow-y-auto max-h-[160px]">
              <label className="text-xs uppercase tracking-wider font-extrabold text-gray-400 block mb-2">{active.emojis}</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      playTap();
                      onSelectEmoji(emoji);
                    }}
                    className={`h-11 w-11 text-xl flex items-center justify-center rounded-xl cursor-pointer transition-transform duration-200 hover:scale-125 hover:bg-white/5 ${selectedEmoji === emoji ? 'bg-white/10 border border-white/20' : ''}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                playTap();
                onClose();
              }}
              className="w-full py-4 rounded-[2rem] bg-white text-black font-black text-sm uppercase tracking-wider shadow-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {active.done}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
