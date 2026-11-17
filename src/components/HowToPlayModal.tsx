import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import { playTap } from '../utils/audio';
import { Language } from '../types';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function HowToPlayModal({ isOpen, onClose, lang }: HowToPlayModalProps) {
  const active = {
    pt: {
      title: 'MANUAL DO AGENTE',
      subtitle: 'Entenda a estratégia do IMPOSTOR em 5 passos rápidos',
      close: 'ENTENDIDO',
      steps: [
        {
          title: '1. Monte a Mesa',
          desc: 'Adicione pelo menos 3 jogadores (5+ para jogar com 2 Impostores) e ajuste dificuldade, tempo e modo de votação.'
        },
        {
          title: '2. Dossiê Secreto',
          desc: 'Passe o aparelho. Inocentes veem a Palavra Secreta. O Impostor vê apenas a Categoria e uma pista sutil para blefar.'
        },
        {
          title: '3. Discussão no Tempo',
          desc: 'Um jogador sorteado começa! Vocês fazem perguntas entre si até o tempo acabar para tentar descobrir quem está blefando.'
        },
        {
          title: '4. Votação (1 ou 2 Suspeitos)',
          desc: 'Com 1 Impostor, vote em 1 suspeito. Com 2 Impostores, cada voto escolhe 2 suspeitos diferentes antes de confirmar!'
        },
        {
          title: '5. Desmascaramento',
          desc: 'Descubra todos os impostores para conquistar a vitória total. Com 2 impostores, pegar apenas 1 gera vitória parcial!'
        }
      ]
    },
    en: {
      title: 'AGENT FIELD MANUAL',
      subtitle: 'Learn IMPOSTOR strategy in 5 quick steps',
      close: 'GOT IT',
      steps: [
        {
          title: '1. Assemble the Table',
          desc: 'Add at least 3 players (5+ for 2 Impostors) and choose difficulty, timer, and voting mode.'
        },
        {
          title: '2. Secret Dossier',
          desc: 'Pass the phone around. Innocents see the Secret Word. The Impostor only sees the Category and a subtle clue.'
        },
        {
          title: '3. Timed Discussion',
          desc: 'A randomly chosen player starts! Ask each other questions until time runs out to uncover who is bluffing.'
        },
        {
          title: '4. Voting (1 or 2 Suspects)',
          desc: 'With 1 Impostor, vote for 1 suspect. With 2 Impostors, pick 2 different suspects before confirming!'
        },
        {
          title: '5. Reveal & Verdict',
          desc: 'Unmask every impostor for full victory. With 2 impostors, catching just 1 yields a partial victory!'
        }
      ]
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
            className="relative z-10 w-full max-w-md glass-panel rounded-[28px] text-white flex flex-col max-h-[85dvh] overflow-hidden"
          >
            <div className="p-5 pb-4 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-lg font-bold font-display tracking-tight text-white">
                    {active.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">{active.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 text-slate-300 rounded-full p-2 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {active.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/8 space-y-1"
                >
                  <h4 className="text-sm font-bold font-display text-cyan-300">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/25 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold font-display hover:bg-cyan-300 transition-colors active:scale-98 text-xs uppercase tracking-[0.18em] cursor-pointer"
              >
                {active.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
