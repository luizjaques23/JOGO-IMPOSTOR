import { Category } from '../types';

export const CATEGORIES: Record<string, Category> = {
  investigacao: {
    id: 'investigacao',
    name: { pt: 'Mistério & Crime', en: 'Mystery & Crime' },
    icon: '🕵️',
    desc: {
      pt: 'Espionagem, álibis, segredos de estado e investigações tensas.',
      en: 'Espionage, alibis, state secrets, and tense investigations.'
    },
    color: 'from-rose-600/30 via-red-950/40 to-slate-950/80',
    accentColor: 'text-rose-400 border-rose-500/30',
    words: [
      { word: { pt: 'Cena do Crime', en: 'Crime Scene' }, hint: { pt: 'Perímetro', en: 'Perimeter' }, difficulty: 'balanced' },
      { word: { pt: 'Álibi Perfeito', en: 'Perfect Alibi' }, hint: { pt: 'Horário', en: 'Schedule' }, difficulty: 'balanced' },
      { word: { pt: 'Testemunha Ocular', en: 'Eyewitness' }, hint: { pt: 'Memória', en: 'Memory' }, difficulty: 'balanced' },
      { word: { pt: 'Interrogatório', en: 'Interrogation' }, hint: { pt: 'Lâmpada', en: 'Lamp' }, difficulty: 'balanced' },
      { word: { pt: 'Cofre Bancário', en: 'Bank Vault' }, hint: { pt: 'Combinação', en: 'Combination' }, difficulty: 'balanced' },

      { word: { pt: 'Agente Duplo', en: 'Double Agent' }, hint: { pt: 'Lealdade', en: 'Loyalty' }, difficulty: 'tactical' },
      { word: { pt: 'Pista Falsa', en: 'Red Herring' }, hint: { pt: 'Desvio', en: 'Detour' }, difficulty: 'tactical' },
      { word: { pt: 'Identidade Falsa', en: 'Fake Identity' }, hint: { pt: 'Papel', en: 'Paper' }, difficulty: 'tactical' },
      { word: { pt: 'Escuta Telefônica', en: 'Wiretap' }, hint: { pt: 'Ruído', en: 'Static' }, difficulty: 'tactical' },
      { word: { pt: 'Chantagem', en: 'Blackmail' }, hint: { pt: 'Preço', en: 'Price' }, difficulty: 'tactical' },

      { word: { pt: 'Dossiê Confidencial', en: 'Classified Dossier' }, hint: { pt: 'Arquivo', en: 'Archive' }, difficulty: 'mastermind' },
      { word: { pt: 'Queima de Arquivo', en: 'Cover-Up' }, hint: { pt: 'Cinzas', en: 'Ashes' }, difficulty: 'mastermind' },
      { word: { pt: 'Delação Premiada', en: 'Plea Bargain' }, hint: { pt: 'Acordo', en: 'Deal' }, difficulty: 'mastermind' },
      { word: { pt: 'Crime Perfeito', en: 'Perfect Crime' }, hint: { pt: 'Ausência', en: 'Absence' }, difficulty: 'mastermind' },
      { word: { pt: 'Testamento Alterado', en: 'Forged Will' }, hint: { pt: 'Assinatura', en: 'Signature' }, difficulty: 'mastermind' }
    ]
  },

  psicologia: {
    id: 'psicologia',
    name: { pt: 'Mente & Psicologia', en: 'Mind & Psychology' },
    icon: '🧠',
    desc: {
      pt: 'Viéses mentais, ilusões, emoções ocultas e jogos psicológicos.',
      en: 'Cognitive biases, illusions, hidden emotions, and mind games.'
    },
    color: 'from-violet-600/30 via-purple-950/40 to-slate-950/80',
    accentColor: 'text-violet-400 border-violet-500/30',
    words: [
      { word: { pt: 'Déjà Vu', en: 'Déjà Vu' }, hint: { pt: 'Repetição', en: 'Repetition' }, difficulty: 'balanced' },
      { word: { pt: 'Intuição', en: 'Intuition' }, hint: { pt: 'Sussurro', en: 'Whisper' }, difficulty: 'balanced' },
      { word: { pt: 'Nostalgia', en: 'Nostalgia' }, hint: { pt: 'Cheiro', en: 'Scent' }, difficulty: 'balanced' },
      { word: { pt: 'Pesadelo Lúcido', en: 'Lucid Nightmare' }, hint: { pt: 'Despertar', en: 'Awakening' }, difficulty: 'balanced' },
      { word: { pt: 'Inveja Silenciosa', en: 'Quiet Envy' }, hint: { pt: 'Comparação', en: 'Comparison' }, difficulty: 'balanced' },

      { word: { pt: 'Efeito Placebo', en: 'Placebo Effect' }, hint: { pt: 'Crença', en: 'Belief' }, difficulty: 'tactical' },
      { word: { pt: 'Síndrome do Impostor', en: 'Impostor Syndrome' }, hint: { pt: 'Mérito', en: 'Merit' }, difficulty: 'tactical' },
      { word: { pt: 'Zona de Conforto', en: 'Comfort Zone' }, hint: { pt: 'Muro', en: 'Wall' }, difficulty: 'tactical' },
      { word: { pt: 'Blefe Estratégico', en: 'Strategic Bluff' }, hint: { pt: 'Postura', en: 'Posture' }, difficulty: 'tactical' },
      { word: { pt: 'Manipulação Emocional', en: 'Gaslighting' }, hint: { pt: 'Dúvida', en: 'Doubt' }, difficulty: 'tactical' },

      { word: { pt: 'Dissonância Cognitiva', en: 'Cognitive Dissonance' }, hint: { pt: 'Conflito', en: 'Conflict' }, difficulty: 'mastermind' },
      { word: { pt: 'Efeito Manada', en: 'Herd Mentality' }, hint: { pt: 'Direção', en: 'Direction' }, difficulty: 'mastermind' },
      { word: { pt: 'Viés de Confirmação', en: 'Confirmation Bias' }, hint: { pt: 'Filtro', en: 'Filter' }, difficulty: 'mastermind' },
      { word: { pt: 'Paradoxo da Escolha', en: 'Paradox of Choice' }, hint: { pt: 'Paralisia', en: 'Paralysis' }, difficulty: 'mastermind' },
      { word: { pt: 'Catarse', en: 'Catharsis' }, hint: { pt: 'Alívio', en: 'Relief' }, difficulty: 'mastermind' }
    ]
  },

  cenarios: {
    id: 'cenarios',
    name: { pt: 'Lugares & Cenários', en: 'Places & Settings' },
    icon: '🗺️',
    desc: {
      pt: 'Ambientes cheios de tensão, histórias escondidas e atmosferas únicas.',
      en: 'Environments full of tension, hidden stories, and unique atmospheres.'
    },
    color: 'from-cyan-600/30 via-sky-950/40 to-slate-950/80',
    accentColor: 'text-cyan-400 border-cyan-500/30',
    words: [
      { word: { pt: 'Aeroporto na Madrugada', en: 'Midnight Airport' }, hint: { pt: 'Espera', en: 'Waiting' }, difficulty: 'balanced' },
      { word: { pt: 'Museu à Noite', en: 'Museum at Night' }, hint: { pt: 'Eco', en: 'Echo' }, difficulty: 'balanced' },
      { word: { pt: 'Biblioteca Silenciosa', en: 'Silent Library' }, hint: { pt: 'Poeira', en: 'Dust' }, difficulty: 'balanced' },
      { word: { pt: 'Estúdio de Tatuagem', en: 'Tattoo Studio' }, hint: { pt: 'Permanência', en: 'Permanence' }, difficulty: 'balanced' },
      { word: { pt: 'Cinema Drive-In', en: 'Drive-In Cinema' }, hint: { pt: 'Farol', en: 'Headlight' }, difficulty: 'balanced' },

      { word: { pt: 'Submarino Nuclear', en: 'Nuclear Submarine' }, hint: { pt: 'Pressão', en: 'Pressure' }, difficulty: 'tactical' },
      { word: { pt: 'Cassino Clandestino', en: 'Underground Casino' }, hint: { pt: 'Ficha', en: 'Token' }, difficulty: 'tactical' },
      { word: { pt: 'Estação Espacial', en: 'Space Station' }, hint: { pt: 'Vácuo', en: 'Vacuum' }, difficulty: 'tactical' },
      { word: { pt: 'Sala de Cirurgia', en: 'Operating Room' }, hint: { pt: 'Precisão', en: 'Precision' }, difficulty: 'tactical' },
      { word: { pt: 'Bastidores de Teatro', en: 'Theater Backstage' }, hint: { pt: 'Cortina', en: 'Curtain' }, difficulty: 'tactical' },

      { word: { pt: 'Bunker Subterrâneo', en: 'Underground Bunker' }, hint: { pt: 'Reserva', en: 'Reserve' }, difficulty: 'mastermind' },
      { word: { pt: 'Plataforma Petrolífera', en: 'Oil Rig' }, hint: { pt: 'Isolamento', en: 'Isolation' }, difficulty: 'mastermind' },
      { word: { pt: 'Tribunal do Júri', en: 'Jury Courtroom' }, hint: { pt: 'Consenso', en: 'Consensus' }, difficulty: 'mastermind' },
      { word: { pt: 'Observatório Astronômico', en: 'Observatory' }, hint: { pt: 'Cúpula', en: 'Dome' }, difficulty: 'mastermind' },
      { word: { pt: 'Navio Cargueiro', en: 'Cargo Ship' }, hint: { pt: 'Horizonte', en: 'Horizon' }, difficulty: 'mastermind' }
    ]
  },

  tecnologia: {
    id: 'tecnologia',
    name: { pt: 'Tecnologia & Futuro', en: 'Tech & Future' },
    icon: '⚡',
    desc: {
      pt: 'Inteligência artificial, vigilância digital e dilemas da era conectada.',
      en: 'Artificial intelligence, digital surveillance, and modern tech dilemmas.'
    },
    color: 'from-blue-600/30 via-indigo-950/40 to-slate-950/80',
    accentColor: 'text-sky-400 border-sky-500/30',
    words: [
      { word: { pt: 'Modo Avião', en: 'Airplane Mode' }, hint: { pt: 'Desconexão', en: 'Disconnection' }, difficulty: 'balanced' },
      { word: { pt: 'Senha Esquecida', en: 'Forgotten Password' }, hint: { pt: 'Bloqueio', en: 'Lockout' }, difficulty: 'balanced' },
      { word: { pt: 'Histórico de Navegação', en: 'Browser History' }, hint: { pt: 'Rastro', en: 'Trail' }, difficulty: 'balanced' },
      { word: { pt: 'Carregador Portátil', en: 'Power Bank' }, hint: { pt: 'Sobrevida', en: 'Lifeline' }, difficulty: 'balanced' },
      { word: { pt: 'Reconhecimento Facial', en: 'Face Recognition' }, hint: { pt: 'Ângulo', en: 'Angle' }, difficulty: 'balanced' },

      { word: { pt: 'Deepfake', en: 'Deepfake' }, hint: { pt: 'Reflexo', en: 'Reflection' }, difficulty: 'tactical' },
      { word: { pt: 'Algoritmo de Rede', en: 'Social Algorithm' }, hint: { pt: 'Bolha', en: 'Bubble' }, difficulty: 'tactical' },
      { word: { pt: 'Ciberataque', en: 'Cyberattack' }, hint: { pt: 'Brecha', en: 'Breach' }, difficulty: 'tactical' },
      { word: { pt: 'Realidade Virtual', en: 'Virtual Reality' }, hint: { pt: 'Imersão', en: 'Immersion' }, difficulty: 'tactical' },
      { word: { pt: 'Drone Autônomo', en: 'Autonomous Drone' }, hint: { pt: 'Zumbido', en: 'Hum' }, difficulty: 'tactical' },

      { word: { pt: 'Criptografia Ponta a Ponta', en: 'End-to-End Encryption' }, hint: { pt: 'Sigilo', en: 'Secrecy' }, difficulty: 'mastermind' },
      { word: { pt: 'Obsolescência Programada', en: 'Planned Obsolescence' }, hint: { pt: 'Prazo', en: 'Deadline' }, difficulty: 'mastermind' },
      { word: { pt: 'Teste de Turing', en: 'Turing Test' }, hint: { pt: 'Imitação', en: 'Imitation' }, difficulty: 'mastermind' },
      { word: { pt: 'Apagão de Dados', en: 'Data Blackout' }, hint: { pt: 'Amnésia', en: 'Amnesia' }, difficulty: 'mastermind' },
      { word: { pt: 'Computação Quântica', en: 'Quantum Computing' }, hint: { pt: 'Possibilidade', en: 'Possibility' }, difficulty: 'mastermind' }
    ]
  },

  situacoes: {
    id: 'situacoes',
    name: { pt: 'Situações & Dilemas', en: 'Situations & Dilemmas' },
    icon: '🎭',
    desc: {
      pt: 'Momentos sociais constrangedores, escolhas difíceis e imprevistos.',
      en: 'Awkward social moments, tough choices, and unexpected twists.'
    },
    color: 'from-amber-600/30 via-orange-950/40 to-slate-950/80',
    accentColor: 'text-amber-400 border-amber-500/30',
    words: [
      { word: { pt: 'Ficar Preso no Elevador', en: 'Stuck in an Elevator' }, hint: { pt: 'Desconforto', en: 'Discomfort' }, difficulty: 'balanced' },
      { word: { pt: 'Festa Surpresa', en: 'Surprise Party' }, hint: { pt: 'Fingimento', en: 'Pretending' }, difficulty: 'balanced' },
      { word: { pt: 'Primeiro Encontro', en: 'First Date' }, hint: { pt: 'Expectativa', en: 'Expectation' }, difficulty: 'balanced' },
      { word: { pt: 'Perder o Voo', en: 'Missing a Flight' }, hint: { pt: 'Atraso', en: 'Delay' }, difficulty: 'balanced' },
      { word: { pt: 'Apagão na Cidade', en: 'Citywide Blackout' }, hint: { pt: 'Vela', en: 'Candle' }, difficulty: 'balanced' },

      { word: { pt: 'Entrevista de Emprego', en: 'Job Interview' }, hint: { pt: 'Aparência', en: 'Appearance' }, difficulty: 'tactical' },
      { word: { pt: 'Mentira Branca', en: 'White Lie' }, hint: { pt: 'Gentileza', en: 'Kindness' }, difficulty: 'tactical' },
      { word: { pt: 'Reunião de Condomínio', en: 'HOA Meeting' }, hint: { pt: 'Regra', en: 'Rule' }, difficulty: 'tactical' },
      { word: { pt: 'Dividir a Conta', en: 'Splitting the Bill' }, hint: { pt: 'Justiça', en: 'Fairness' }, difficulty: 'tactical' },
      { word: { pt: 'Segredo de Amigo', en: 'Friend’s Secret' }, hint: { pt: 'Peso', en: 'Weight' }, difficulty: 'tactical' },

      { word: { pt: 'Conflito de Interesse', en: 'Conflict of Interest' }, hint: { pt: 'Balança', en: 'Scale' }, difficulty: 'mastermind' },
      { word: { pt: 'Dilema do Bonde', en: 'Trolley Problem' }, hint: { pt: 'Sacrifício', en: 'Sacrifice' }, difficulty: 'mastermind' },
      { word: { pt: 'Efeito Espectador', en: 'Bystander Effect' }, hint: { pt: 'Omissão', en: 'Omission' }, difficulty: 'mastermind' },
      { word: { pt: 'Pacto de Silêncio', en: 'Pact of Silence' }, hint: { pt: 'Cumplicidade', en: 'Complicity' }, difficulty: 'mastermind' },
      { word: { pt: 'Último Recurso', en: 'Last Resort' }, hint: { pt: 'Limite', en: 'Limit' }, difficulty: 'mastermind' }
    ]
  },

  arte_cinema: {
    id: 'arte_cinema',
    name: { pt: 'Cinema & Narrativa', en: 'Cinema & Storytelling' },
    icon: '🎬',
    desc: {
      pt: 'Reviravoltas de roteiro, suspense cinematográfico e bastidores.',
      en: 'Plot twists, cinematic suspense, and behind-the-scenes secrets.'
    },
    color: 'from-fuchsia-600/30 via-pink-950/40 to-slate-950/80',
    accentColor: 'text-pink-400 border-pink-500/30',
    words: [
      { word: { pt: 'Spoiler', en: 'Spoiler' }, hint: { pt: 'Estrago', en: 'Ruin' }, difficulty: 'balanced' },
      { word: { pt: 'Cena Pós-Créditos', en: 'Post-Credits Scene' }, hint: { pt: 'Paciência', en: 'Patience' }, difficulty: 'balanced' },
      { word: { pt: 'Trilha Sonora', en: 'Soundtrack' }, hint: { pt: 'Clima', en: 'Mood' }, difficulty: 'balanced' },
      { word: { pt: 'Dublê de Ação', en: 'Stunt Double' }, hint: { pt: 'Substituição', en: 'Replacement' }, difficulty: 'balanced' },
      { word: { pt: 'Trailer Enganoso', en: 'Misleading Trailer' }, hint: { pt: 'Isca', en: 'Bait' }, difficulty: 'balanced' },

      { word: { pt: 'Plot Twist', en: 'Plot Twist' }, hint: { pt: 'Inversão', en: 'Reversal' }, difficulty: 'tactical' },
      { word: { pt: 'Cliffhanger', en: 'Cliffhanger' }, hint: { pt: 'Suspensão', en: 'Suspension' }, difficulty: 'tactical' },
      { word: { pt: 'Anti-Herói', en: 'Anti-Hero' }, hint: { pt: 'Cinza', en: 'Gray' }, difficulty: 'tactical' },
      { word: { pt: 'Plano-Sequência', en: 'One-Shot Scene' }, hint: { pt: 'Fôlego', en: 'Breath' }, difficulty: 'tactical' },
      { word: { pt: 'Filme Cult', en: 'Cult Classic' }, hint: { pt: 'Nicho', en: 'Niche' }, difficulty: 'tactical' },

      { word: { pt: 'Narrador Não Confiável', en: 'Unreliable Narrator' }, hint: { pt: 'Versão', en: 'Version' }, difficulty: 'mastermind' },
      { word: { pt: 'Quarta Parede', en: 'Fourth Wall' }, hint: { pt: 'Olhar', en: 'Gaze' }, difficulty: 'mastermind' },
      { word: { pt: 'MacGuffin', en: 'MacGuffin' }, hint: { pt: 'Pretexto', en: 'Pretext' }, difficulty: 'mastermind' },
      { word: { pt: 'Falso Documentário', en: 'Mockumentary' }, hint: { pt: 'Realismo', en: 'Realism' }, difficulty: 'mastermind' },
      { word: { pt: 'Final Aberto', en: 'Open Ending' }, hint: { pt: 'Interpretação', en: 'Interpretation' }, difficulty: 'mastermind' }
    ]
  },

  objetos: {
    id: 'objetos',
    name: { pt: 'Artefatos & Objetos', en: 'Artifacts & Objects' },
    icon: '🗝️',
    desc: {
      pt: 'Objetos intrigantes, ferramentas de precisão e itens com segredos.',
      en: 'Intriguing items, precision tools, and objects hiding secrets.'
    },
    color: 'from-slate-600/35 via-zinc-900/50 to-slate-950/80',
    accentColor: 'text-slate-300 border-slate-400/30',
    words: [
      { word: { pt: 'Bússola Antiga', en: 'Antique Compass' }, hint: { pt: 'Norte', en: 'North' }, difficulty: 'balanced' },
      { word: { pt: 'Diário Trancado', en: 'Locked Diary' }, hint: { pt: 'Confissão', en: 'Confession' }, difficulty: 'balanced' },
      { word: { pt: 'Ampulheta', en: 'Hourglass' }, hint: { pt: 'Grão', en: 'Grain' }, difficulty: 'balanced' },
      { word: { pt: 'Chave Mestra', en: 'Master Key' }, hint: { pt: 'Acesso', en: 'Access' }, difficulty: 'balanced' },
      { word: { pt: 'Binóculo Noturno', en: 'Night Binoculars' }, hint: { pt: 'Distância', en: 'Distance' }, difficulty: 'balanced' },

      { word: { pt: 'Caixa-Preta', en: 'Black Box' }, hint: { pt: 'Registro', en: 'Record' }, difficulty: 'tactical' },
      { word: { pt: 'Detector de Mentiras', en: 'Lie Detector' }, hint: { pt: 'Pulso', en: 'Pulse' }, difficulty: 'tactical' },
      { word: { pt: 'Espelho Unidirecional', en: 'One-Way Mirror' }, hint: { pt: 'Observador', en: 'Observer' }, difficulty: 'tactical' },
      { word: { pt: 'Passaporte Diplomático', en: 'Diplomatic Passport' }, hint: { pt: 'Imunidade', en: 'Immunity' }, difficulty: 'tactical' },
      { word: { pt: 'Câmera Oculta', en: 'Hidden Camera' }, hint: { pt: 'Ângulo', en: 'Angle' }, difficulty: 'tactical' },

      { word: { pt: 'Cápsula do Tempo', en: 'Time Capsule' }, hint: { pt: 'Promessa', en: 'Promise' }, difficulty: 'mastermind' },
      { word: { pt: 'Selo de Cera', en: 'Wax Seal' }, hint: { pt: 'Integridade', en: 'Integrity' }, difficulty: 'mastermind' },
      { word: { pt: 'Máquina de Enigma', en: 'Enigma Machine' }, hint: { pt: 'Padrão', en: 'Pattern' }, difficulty: 'mastermind' },
      { word: { pt: 'Testamento Lacrado', en: 'Sealed Will' }, hint: { pt: 'Herança', en: 'Legacy' }, difficulty: 'mastermind' },
      { word: { pt: 'Relógio Parado', en: 'Stopped Watch' }, hint: { pt: 'Instante', en: 'Moment' }, difficulty: 'mastermind' }
    ]
  },

  profissoes: {
    id: 'profissoes',
    name: { pt: 'Profissões & Papéis', en: 'Professions & Roles' },
    icon: '💼',
    desc: {
      pt: 'Ofícios de alta responsabilidade, bastidores e decisões críticas.',
      en: 'High-stakes careers, hidden roles, and critical decisions.'
    },
    color: 'from-emerald-600/30 via-teal-950/40 to-slate-950/80',
    accentColor: 'text-emerald-400 border-emerald-500/30',
    words: [
      { word: { pt: 'Detetive Particular', en: 'Private Investigator' }, hint: { pt: 'Sombra', en: 'Shadow' }, difficulty: 'balanced' },
      { word: { pt: 'Chef Crítico', en: 'Food Critic' }, hint: { pt: 'Disfarce', en: 'Disguise' }, difficulty: 'balanced' },
      { word: { pt: 'Dublador', en: 'Voice Actor' }, hint: { pt: 'Tom', en: 'Tone' }, difficulty: 'balanced' },
      { word: { pt: 'Leiloeiro', en: 'Auctioneer' }, hint: { pt: 'Martelo', en: 'Hammer' }, difficulty: 'balanced' },
      { word: { pt: 'Árbitro de VAR', en: 'VAR Referee' }, hint: { pt: 'Revisão', en: 'Review' }, difficulty: 'balanced' },

      { word: { pt: 'Negociador de Crise', en: 'Crisis Negotiator' }, hint: { pt: 'Calma', en: 'Calm' }, difficulty: 'tactical' },
      { word: { pt: 'Perito Criminal', en: 'Forensic Expert' }, hint: { pt: 'Vestígio', en: 'Trace' }, difficulty: 'tactical' },
      { word: { pt: 'Controlador de Voo', en: 'Air Traffic Controller' }, hint: { pt: 'Rota', en: 'Route' }, difficulty: 'tactical' },
      { word: { pt: 'Hacker Ético', en: 'Ethical Hacker' }, hint: { pt: 'Permissão', en: 'Permission' }, difficulty: 'tactical' },
      { word: { pt: 'Ilusionista', en: 'Illusionist' }, hint: { pt: 'Distração', en: 'Distraction' }, difficulty: 'tactical' },

      { word: { pt: 'Mediador Diplomático', en: 'Diplomatic Mediator' }, hint: { pt: 'Trégua', en: 'Truce' }, difficulty: 'mastermind' },
      { word: { pt: 'Atuário de Risco', en: 'Risk Actuary' }, hint: { pt: 'Probabilidade', en: 'Probability' }, difficulty: 'mastermind' },
      { word: { pt: 'Restaurador de Arte', en: 'Art Restorer' }, hint: { pt: 'Camada', en: 'Layer' }, difficulty: 'mastermind' },
      { word: { pt: 'Criptógrafo', en: 'Cryptographer' }, hint: { pt: 'Chave', en: 'Key' }, difficulty: 'mastermind' },
      { word: { pt: 'Sósia Oficial', en: 'Body Double' }, hint: { pt: 'Presença', en: 'Presence' }, difficulty: 'mastermind' }
    ]
  },

  gastronomia: {
    id: 'gastronomia',
    name: { pt: 'Gastronomia & Sabores', en: 'Gastronomy & Flavors' },
    icon: '🍽️',
    desc: {
      pt: 'Experiências culinárias, rituais à mesa e segredos de cozinha.',
      en: 'Culinary experiences, dining rituals, and kitchen secrets.'
    },
    color: 'from-orange-600/30 via-amber-950/40 to-slate-950/80',
    accentColor: 'text-orange-400 border-orange-500/30',
    words: [
      { word: { pt: 'Rodízio de Carnes', en: 'Brazilian Steakhouse' }, hint: { pt: 'Sinal', en: 'Signal' }, difficulty: 'balanced' },
      { word: { pt: 'Café Expresso Duplo', en: 'Double Espresso' }, hint: { pt: 'Madrugada', en: 'Dawn' }, difficulty: 'balanced' },
      { word: { pt: 'Comida de Rua', en: 'Street Food' }, hint: { pt: 'Movimento', en: 'Movement' }, difficulty: 'balanced' },
      { word: { pt: 'Jantar à Luz de Velas', en: 'Candlelight Dinner' }, hint: { pt: 'Clima', en: 'Mood' }, difficulty: 'balanced' },
      { word: { pt: 'Piquenique no Parque', en: 'Park Picnic' }, hint: { pt: 'Toalha', en: 'Cloth' }, difficulty: 'balanced' },

      { word: { pt: 'Degustação às Cegas', en: 'Blind Tasting' }, hint: { pt: 'Confiança', en: 'Trust' }, difficulty: 'tactical' },
      { word: { pt: 'Prato Extrapicante', en: 'Extra Spicy Dish' }, hint: { pt: 'Arrependimento', en: 'Regret' }, difficulty: 'tactical' },
      { word: { pt: 'Receita Secreta', en: 'Secret Recipe' }, hint: { pt: 'Tradição', en: 'Tradition' }, difficulty: 'tactical' },
      { word: { pt: 'Jejum Prolongado', en: 'Extended Fasting' }, hint: { pt: 'Disciplina', en: 'Discipline' }, difficulty: 'tactical' },
      { word: { pt: 'Sobremesa Flambada', en: 'Flambé Dessert' }, hint: { pt: 'Espetáculo', en: 'Spectacle' }, difficulty: 'tactical' },

      { word: { pt: 'Gastronomia Molecular', en: 'Molecular Gastronomy' }, hint: { pt: 'Textura', en: 'Texture' }, difficulty: 'mastermind' },
      { word: { pt: 'Menu Omakase', en: 'Omakase Menu' }, hint: { pt: 'Entrega', en: 'Surrender' }, difficulty: 'mastermind' },
      { word: { pt: 'Vinho de Safra Rara', en: 'Rare Vintage Wine' }, hint: { pt: 'Tempo', en: 'Time' }, difficulty: 'mastermind' },
      { word: { pt: 'Ração de Sobrevivência', en: 'Survival Ration' }, hint: { pt: 'Energia', en: 'Energy' }, difficulty: 'mastermind' },
      { word: { pt: 'Banquete Real', en: 'Royal Banquet' }, hint: { pt: 'Excesso', en: 'Excess' }, difficulty: 'mastermind' }
    ]
  },

  natureza: {
    id: 'natureza',
    name: { pt: 'Natureza & Fenômenos', en: 'Nature & Phenomena' },
    icon: '🌪️',
    desc: {
      pt: 'Forças extremas, mistérios geográficos e eventos raros do planeta.',
      en: 'Extreme forces, geographic mysteries, and rare planetary events.'
    },
    color: 'from-teal-600/30 via-emerald-950/40 to-slate-950/80',
    accentColor: 'text-teal-400 border-teal-500/30',
    words: [
      { word: { pt: 'Eclipse Solar', en: 'Solar Eclipse' }, hint: { pt: 'Sombra', en: 'Shadow' }, difficulty: 'balanced' },
      { word: { pt: 'Aurora Boreal', en: 'Northern Lights' }, hint: { pt: 'Silêncio', en: 'Silence' }, difficulty: 'balanced' },
      { word: { pt: 'Tempestade de Areia', en: 'Sandstorm' }, hint: { pt: 'Visibilidade', en: 'Visibility' }, difficulty: 'balanced' },
      { word: { pt: 'Vulcão Adormecido', en: 'Dormant Volcano' }, hint: { pt: 'Paciência', en: 'Patience' }, difficulty: 'balanced' },
      { word: { pt: 'Miragem no Deserto', en: 'Desert Mirage' }, hint: { pt: 'Sede', en: 'Thirst' }, difficulty: 'balanced' },

      { word: { pt: 'Triângulo das Bermudas', en: 'Bermuda Triangle' }, hint: { pt: 'Rota', en: 'Route' }, difficulty: 'tactical' },
      { word: { pt: 'Fossa das Marianas', en: 'Mariana Trench' }, hint: { pt: 'Abismo', en: 'Abyss' }, difficulty: 'tactical' },
      { word: { pt: 'Maré Vermelha', en: 'Red Tide' }, hint: { pt: 'Alerta', en: 'Alert' }, difficulty: 'tactical' },
      { word: { pt: 'Nevoeiro Denso', en: 'Dense Fog' }, hint: { pt: 'Fronteira', en: 'Border' }, difficulty: 'tactical' },
      { word: { pt: 'Chuva de Meteoros', en: 'Meteor Shower' }, hint: { pt: 'Desejo', en: 'Wish' }, difficulty: 'tactical' },

      { word: { pt: 'Bioluminescência', en: 'Bioluminescence' }, hint: { pt: 'Sinal', en: 'Signal' }, difficulty: 'mastermind' },
      { word: { pt: 'Inversão Térmica', en: 'Thermal Inversion' }, hint: { pt: 'Camada', en: 'Layer' }, difficulty: 'mastermind' },
      { word: { pt: 'Ponto de Não Retorno', en: 'Tipping Point' }, hint: { pt: 'Equilíbrio', en: 'Balance' }, difficulty: 'mastermind' },
      { word: { pt: 'Olho do Furacão', en: 'Eye of the Storm' }, hint: { pt: 'Calmaria', en: 'Calm' }, difficulty: 'mastermind' },
      { word: { pt: 'Permafrost', en: 'Permafrost' }, hint: { pt: 'Memória', en: 'Memory' }, difficulty: 'mastermind' }
    ]
  },

  esportes: {
    id: 'esportes',
    name: { pt: 'Esportes & Pressão', en: 'Sports & High Stakes' },
    icon: '🏆',
    desc: {
      pt: 'Momentos decisivos, táticas de jogo e superação sob pressão.',
      en: 'Clutch moments, game tactics, and performance under pressure.'
    },
    color: 'from-yellow-600/30 via-amber-950/40 to-slate-950/80',
    accentColor: 'text-yellow-400 border-yellow-500/30',
    words: [
      { word: { pt: 'Pênalti Decisivo', en: 'Decisive Penalty' }, hint: { pt: 'Pressão', en: 'Pressure' }, difficulty: 'balanced' },
      { word: { pt: 'Prorrogação', en: 'Overtime' }, hint: { pt: 'Fôlego', en: 'Stamina' }, difficulty: 'balanced' },
      { word: { pt: 'Escalada Livre', en: 'Free Climbing' }, hint: { pt: 'Aderência', en: 'Grip' }, difficulty: 'balanced' },
      { word: { pt: 'Esgrima', en: 'Fencing' }, hint: { pt: 'Reflexo', en: 'Reflex' }, difficulty: 'balanced' },
      { word: { pt: 'Corrida na Chuva', en: 'Rain Race' }, hint: { pt: 'Aderência', en: 'Traction' }, difficulty: 'balanced' },

      { word: { pt: 'Photo Finish', en: 'Photo Finish' }, hint: { pt: 'Milímetro', en: 'Millimeter' }, difficulty: 'tactical' },
      { word: { pt: 'Cartão Vermelho', en: 'Red Card' }, hint: { pt: 'Ausência', en: 'Absence' }, difficulty: 'tactical' },
      { word: { pt: 'Maratona Noturna', en: 'Night Marathon' }, hint: { pt: 'Ritmo', en: 'Pace' }, difficulty: 'tactical' },
      { word: { pt: 'Xadrez Relâmpago', en: 'Blitz Chess' }, hint: { pt: 'Relógio', en: 'Clock' }, difficulty: 'tactical' },
      { word: { pt: 'Salto de Paraquedas', en: 'Skydiving' }, hint: { pt: 'Confiança', en: 'Trust' }, difficulty: 'tactical' },

      { word: { pt: 'Exame Antidoping', en: 'Doping Test' }, hint: { pt: 'Suspeita', en: 'Suspicion' }, difficulty: 'mastermind' },
      { word: { pt: 'Fator Casa', en: 'Home Advantage' }, hint: { pt: 'Pressão', en: 'Pressure' }, difficulty: 'mastermind' },
      { word: { pt: 'Zebra do Campeonato', en: 'Underdog Upset' }, hint: { pt: 'Estatística', en: 'Statistics' }, difficulty: 'mastermind' },
      { word: { pt: 'Falsa Largada', en: 'False Start' }, hint: { pt: 'Ansiedade', en: 'Anxiety' }, difficulty: 'mastermind' },
      { word: { pt: 'Recorde Imbatível', en: 'Unbroken Record' }, hint: { pt: 'Sombra', en: 'Shadow' }, difficulty: 'mastermind' }
    ]
  },

  jogos: {
    id: 'jogos',
    name: { pt: 'Jogos & Estratégia', en: 'Games & Strategy' },
    icon: '🎲',
    desc: {
      pt: 'Blefe, táticas secretas, puzzles e mundos competitivos.',
      en: 'Bluffing, hidden tactics, puzzles, and competitive worlds.'
    },
    color: 'from-indigo-600/30 via-blue-950/40 to-slate-950/80',
    accentColor: 'text-indigo-400 border-indigo-500/30',
    words: [
      { word: { pt: 'Escape Room', en: 'Escape Room' }, hint: { pt: 'Cadeado', en: 'Padlock' }, difficulty: 'balanced' },
      { word: { pt: 'Blefe no Poker', en: 'Poker Bluff' }, hint: { pt: 'Olhar', en: 'Gaze' }, difficulty: 'balanced' },
      { word: { pt: 'Easter Egg', en: 'Easter Egg' }, hint: { pt: 'Curiosidade', en: 'Curiosity' }, difficulty: 'balanced' },
      { word: { pt: 'RPG de Mesa', en: 'Tabletop RPG' }, hint: { pt: 'Destino', en: 'Fate' }, difficulty: 'balanced' },
      { word: { pt: 'Batalha Naval', en: 'Battleship' }, hint: { pt: 'Coordenada', en: 'Coordinate' }, difficulty: 'balanced' },

      { word: { pt: 'Speedrun', en: 'Speedrun' }, hint: { pt: 'Atalho', en: 'Shortcut' }, difficulty: 'tactical' },
      { word: { pt: 'Chefe Secreto', en: 'Secret Boss' }, hint: { pt: 'Desvio', en: 'Detour' }, difficulty: 'tactical' },
      { word: { pt: 'Modo Permadeath', en: 'Permadeath Mode' }, hint: { pt: 'Cautela', en: 'Caution' }, difficulty: 'tactical' },
      { word: { pt: 'Amigo Oculto', en: 'Secret Santa' }, hint: { pt: 'Disfarce', en: 'Disguise' }, difficulty: 'tactical' },
      { word: { pt: 'Cartas Marcadas', en: 'Marked Cards' }, hint: { pt: 'Vantagem', en: 'Advantage' }, difficulty: 'tactical' },

      { word: { pt: 'Teoria dos Jogos', en: 'Game Theory' }, hint: { pt: 'Antecipação', en: 'Anticipation' }, difficulty: 'mastermind' },
      { word: { pt: 'Xeque-Mate Sufocado', en: 'Smothered Mate' }, hint: { pt: 'Cerco', en: 'Siege' }, difficulty: 'mastermind' },
      { word: { pt: 'Dilema do Prisioneiro', en: 'Prisoner’s Dilemma' }, hint: { pt: 'Traição', en: 'Betrayal' }, difficulty: 'mastermind' },
      { word: { pt: 'Fog of War', en: 'Fog of War' }, hint: { pt: 'Incerteza', en: 'Uncertainty' }, difficulty: 'mastermind' },
      { word: { pt: 'Meta Quebrada', en: 'Broken Meta' }, hint: { pt: 'Desequilíbrio', en: 'Imbalance' }, difficulty: 'mastermind' }
    ]
  }
};
