import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, AlertCircle, HelpCircle, Users, CheckCircle } from 'lucide-react';
import { playTap } from '../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
}

export default function HowToPlayModal({ isOpen, onClose, lang }: HowToPlayModalProps) {
  const content = {
    pt: {
      title: 'COMO JOGAR',
      subtitle: 'Aprenda as regras básicas do JOGO DO IMPOSTOR em 1 minuto!',
      close: 'Fechar',
      steps: [
        {
          title: '1. Prepare o Grupo 👥',
          desc: 'Adicione pelo menos 3 amigos e escolha uma categoria de palavras para iniciar a partida.'
        },
        {
          title: '2. Olhe a sua Tela em Segredo 🤫',
          desc: 'Passe o celular para cada um. Os inocentes verão a Palavra Secreta (ex: "Pizza"). O Impostor receberá só uma dica simples de associação (ex: "Fatia").'
        },
        {
          title: '3. Perguntas e Deduções 💬',
          desc: 'O relógio corre! Cada um faz uma pergunta discreta ou diz uma palavra que descreva seu segredo. O Impostor deve fingir que sabe a palavra, usando seu raciocínio para se misturar!'
        },
        {
          title: '4. A Votação Final 🗳️',
          desc: 'Terminado o tempo, debatam! Apontem e votem em quem agiu de forma mais suspeita ou gaguejou na explicação.'
        },
        {
          title: '5. Revelação e Vitória 🏆',
          desc: 'Se o Impostor for desmascarado, os inocentes vencem! Estudem o segredo e tentem descobrir o farsante no próximo turno.'
        }
      ]
    },
    en: {
      title: 'HOW TO PLAY',
      subtitle: 'Learn the basic rules of JOGO DO IMPOSTOR in 1 minute!',
      close: 'Close',
      steps: [
        {
          title: '1. Prepare your Crew 👥',
          desc: 'Add at least 3 friends and pick a word category to initiate the match.'
        },
        {
          title: '2. Look at your Screen in Secret 🤫',
          desc: 'Pass the device around. Innocent players will see the Secret Word (e.g. "Pizza"). The Imposter will only see a vague hint (e.g. "Italy").'
        },
        {
          title: '3. Questions & Deceptions 💬',
          desc: 'The timer is ticking! Take turns asking questions or speaking words related to your secret. The Imposter must blend in and guess the secret context using the hint!'
        },
        {
          title: '4. The Final Vote 🗳️',
          desc: 'When time is up, deliberate! Point and submit your vote on who acted most suspiciously or stumbled during their description.'
        },
        {
          title: '5. Reveal & Ultimate Victory 🏆',
          desc: 'If the group successfully catches the Imposter, Innocents win! Otherwise, the Impostor slips away as the victor.'
        }
      ]
    }
  };

  const active = content[lang];

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg bg-[#1F1F23] border border-white/10 rounded-[35px] shadow-3xl text-white flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h3 className="text-2xl font-black font-display tracking-tight text-white">{active.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">{active.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 text-gray-300 rounded-full p-2 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable list of steps) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {active.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                  <div className="flex flex-col space-y-1">
                    <h4 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-display">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/5 bg-[#17171A] flex justify-end">
              <button
                onClick={() => {
                  playTap();
                  onClose();
                }}
                className="bg-white text-black font-black px-6 py-3 rounded-full hover:bg-gray-200 transition-transform active:scale-95 text-xs uppercase cursor-pointer"
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
