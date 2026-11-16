import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { playTap } from '../utils/audio';
import { Language } from '../types';

interface AvatarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  selectedEmoji: string;
  onSelectColor: (color: string) => void;
  onSelectEmoji: (emoji: string) => void;
  lang: Language;
}

export const AVATAR_COLORS = [
  'bg-rose-600',
  'bg-orange-500',
  'bg-amber-500',
  'bg-emerald-600',
  'bg-cyan-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-slate-600'
];

export const AVATAR_EMOJIS = [
  '🕵️', '🦊', '🦉', '🐺', '🐱', '🦁', '🐙', '🦅',
  '🎭', '🃏', '🔮', '🗝️', '⚡', '🌙', '🔥', '💎',
  '🧠', '👁️', '🕶️', '🛸', '🚀', '👾', '🎲', '🧭',
  '🎸', '🎧', '👑', '💀', '🐉', '🦈', '🦄', '🦖'
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
  const active = {
    pt: {
      title: 'Identidade do Agente',
      subtitle: 'Escolha a cor do dossiê e seu emblema',
      colors: 'Cor do Perfil',
      emojis: 'Emblema',
      done: 'SALVAR PERFIL'
    },
    en: {
      title: 'Agent Identity',
      subtitle: 'Pick your dossier color and emblem',
      colors: 'Profile Color',
      emojis: 'Emblem',
      done: 'SAVE PROFILE'
    }
  }[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playTap();
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative z-10 w-full max-w-sm glass-panel rounded-[28px] text-white flex flex-col p-5 sm:p-6 max-h-[85dvh]"
          >
            {/* Header + Live Preview */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${selectedColor} flex items-center justify-center text-2xl border border-white/25 shadow-lg`}
                >
                  {selectedEmoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{active.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 text-slate-300 rounded-full p-2 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Color Grid */}
            <div className="mb-5">
              <label className="text-[10px] uppercase tracking-[0.18em] font-mono font-bold text-slate-400 block mb-2.5">
                {active.colors}
              </label>
              <div className="grid grid-cols-5 gap-2.5">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      playTap();
                      onSelectColor(color);
                    }}
                    className={`h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform active:scale-90 border border-white/15 ${color}`}
                  >
                    {selectedColor === color && (
                      <div className="bg-black/45 rounded-full p-1 text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Grid */}
            <div className="mb-5 flex-1 min-h-0 overflow-y-auto pr-1">
              <label className="text-[10px] uppercase tracking-[0.18em] font-mono font-bold text-slate-400 block mb-2.5">
                {active.emojis}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      playTap();
                      onSelectEmoji(emoji);
                    }}
                    className={`h-11 text-xl flex items-center justify-center rounded-xl cursor-pointer transition-all active:scale-90 ${
                      selectedEmoji === emoji
                        ? 'bg-cyan-500/20 border border-cyan-400/50 scale-105'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border border-transparent'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playTap();
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold font-display text-xs uppercase tracking-[0.18em] shadow-xl hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              {active.done}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
