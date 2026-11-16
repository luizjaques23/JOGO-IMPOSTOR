import { StrategicQuestion, TwistModifier } from '../types';

export const STRATEGIC_QUESTIONS: StrategicQuestion[] = [
  // Psychological & Indirect (High Bluff Potential)
  {
    id: 'q1',
    text: {
      pt: 'Se isso desaparecesse do mundo por 48 horas, qual seria o primeiro sinal de caos ou mudança perceptível?',
      en: 'If this vanished from the world for 48 hours, what would be the first noticeable sign of chaos or change?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q2',
    text: {
      pt: 'Isso combina mais com silêncio absoluto, conversa em voz baixa ou tensão barulhenta? Explique sem dar detalhes literais.',
      en: 'Does this fit total silence, whispered conversation, or loud tension? Explain without literal details.'
    },
    tag: 'psychological',
    difficulty: 'balanced'
  },
  {
    id: 'q3',
    text: {
      pt: 'Qual emoção define melhor alguém que está lidando com isso às 3 da manhã?',
      en: 'What emotion best defines someone dealing with this at 3 AM?'
    },
    tag: 'psychological',
    difficulty: 'balanced'
  },
  {
    id: 'q4',
    text: {
      pt: 'Você teria orgulho de mencionar isso em uma entrevista ou tentaria mudar de assunto?',
      en: 'Would you proudly bring this up in an interview, or quickly change the subject?'
    },
    tag: 'dilemma',
    difficulty: 'balanced'
  },
  {
    id: 'q5',
    text: {
      pt: 'Se isso fosse proibido por lei amanhã, quem lucraria mais no mercado clandestino?',
      en: 'If this were outlawed tomorrow, who would profit the most underground?'
    },
    tag: 'scenario',
    difficulty: 'tactical'
  },
  {
    id: 'q6',
    text: {
      pt: 'Isso exige mais paciência, sangue frio, dinheiro ou sorte?',
      en: 'Does this require more patience, cold nerves, money, or luck?'
    },
    tag: 'bluff',
    difficulty: 'balanced'
  },
  {
    id: 'q7',
    text: {
      pt: 'Qual é o maior mal-entendido que alguém de fora teria sobre isso?',
      en: 'What is the biggest misconception an outsider would have about this?'
    },
    tag: 'psychological',
    difficulty: 'tactical'
  },
  {
    id: 'q8',
    text: {
      pt: 'Se você tivesse que defender a importância disso para alguém totalmente cético, qual seria seu principal argumento?',
      en: 'If you had to convince a complete skeptic why this matters, what would your core argument be?'
    },
    tag: 'bluff',
    difficulty: 'tactical'
  },
  {
    id: 'q9',
    text: {
      pt: 'Isso aproxima pessoas que não se conhecem ou cria desconfiança entre quem já é próximo?',
      en: 'Does this bring strangers together or create distrust among people who already know each other?'
    },
    tag: 'psychological',
    difficulty: 'tactical'
  },
  {
    id: 'q10',
    text: {
      pt: 'Qual seria o pior momento possível da vida para alguém se deparar com isso?',
      en: 'What would be the worst possible moment in life to run into this?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q11',
    text: {
      pt: 'Se isso tivesse um cheiro ou temperatura simbólica, seria mais frio e metálico ou quente e imprevisível?',
      en: 'If this had a symbolic temperature or texture, would it feel cold and metallic or warm and unpredictable?'
    },
    tag: 'psychological',
    difficulty: 'mastermind'
  },
  {
    id: 'q12',
    text: {
      pt: 'Quem nesta mesa teria mais vantagem — ou mais problema — se dependesse disso hoje?',
      en: 'Who at this table would have the biggest advantage — or biggest trouble — if they depended on this today?'
    },
    tag: 'bluff',
    difficulty: 'balanced'
  },
  {
    id: 'q13',
    text: {
      pt: 'É algo que as pessoas procuram por vontade própria ou algo em que acabam caindo sem perceber?',
      en: 'Is it something people actively seek out, or something they stumble into without realizing?'
    },
    tag: 'dilemma',
    difficulty: 'tactical'
  },
  {
    id: 'q14',
    text: {
      pt: 'Quando isso dá errado, a culpa costuma ser de uma falha humana ou do acaso?',
      en: 'When this goes wrong, is it usually caused by human error or pure chance?'
    },
    tag: 'dilemma',
    difficulty: 'tactical'
  },
  {
    id: 'q15',
    text: {
      pt: 'Você confiaria mais em um iniciante cuidadoso ou em um veterano confiante lidando com isso?',
      en: 'Would you trust a careful beginner or an overconfident veteran handling this?'
    },
    tag: 'dilemma',
    difficulty: 'mastermind'
  },
  {
    id: 'q16',
    text: {
      pt: 'Se isso virasse manchete amanhã, a notícia estaria na página de economia, cultura, polícia ou ciência?',
      en: 'If this made tomorrow’s headlines, would it be under business, culture, crime, or science?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q17',
    text: {
      pt: 'O que custa mais caro nisso: entrar, manter ou sair sem deixar rastros?',
      en: 'What costs the most here: getting in, maintaining it, or walking away cleanly?'
    },
    tag: 'dilemma',
    difficulty: 'mastermind'
  },
  {
    id: 'q18',
    text: {
      pt: 'Se você pudesse apagar apenas uma lembrança ou regra ligada a isso, mudaria tudo ou quase nada?',
      en: 'If you could erase just one rule or memory tied to this, would everything change or barely anything?'
    },
    tag: 'psychological',
    difficulty: 'mastermind'
  },
  {
    id: 'q19',
    text: {
      pt: 'Em uma história de suspense, isso apareceria no primeiro ato para criar clima ou no final para explicar tudo?',
      en: 'In a thriller story, would this appear in Act 1 to set the mood or at the climax to explain everything?'
    },
    tag: 'scenario',
    difficulty: 'tactical',
    categories: ['investigacao', 'arte_cinema', 'psicologia']
  },
  {
    id: 'q20',
    text: {
      pt: 'Isso tende a revelar o melhor lado das pessoas ou a tirar máscaras que elas preferiam manter?',
      en: 'Does this tend to bring out the best in people or strip away masks they’d rather keep on?'
    },
    tag: 'psychological',
    difficulty: 'mastermind',
    categories: ['psicologia', 'situacoes', 'investigacao']
  },
  {
    id: 'q21',
    text: {
      pt: 'Qual é o maior risco de subestimar isso em uma situação real?',
      en: 'What is the biggest risk of underestimating this in a real situation?'
    },
    tag: 'scenario',
    difficulty: 'tactical'
  },
  {
    id: 'q22',
    text: {
      pt: 'Se você tivesse apenas 10 segundos para reagir a isso, sua primeira atitude seria observar, agir ou recuar?',
      en: 'If you had only 10 seconds to react to this, would your first instinct be to observe, act, or step back?'
    },
    tag: 'dilemma',
    difficulty: 'balanced'
  },
  {
    id: 'q23',
    text: {
      pt: 'Isso costuma durar um instante marcante ou se arrastar por horas sem parecer acabar?',
      en: 'Does this usually last a striking instant or drag on for hours without seeming to end?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q24',
    text: {
      pt: 'Qual tipo de pessoa ficaria completamente perdida diante disso: quem improvisa ou quem segue regras à risca?',
      en: 'Who would be more lost facing this: an improviser or someone who strictly follows rules?'
    },
    tag: 'bluff',
    difficulty: 'tactical'
  },
  {
    id: 'q25',
    text: {
      pt: 'Se houvesse uma regra não escrita sobre isso, qual seria a primeira coisa que um novato quebraria sem querer?',
      en: 'If there were an unwritten rule about this, what would a newcomer break by accident first?'
    },
    tag: 'bluff',
    difficulty: 'mastermind'
  },
  {
    id: 'q26',
    text: {
      pt: 'Isso funciona melhor quando todos sabem das regras ou quando apenas um lado tem informação privilegiada?',
      en: 'Does this work better when everyone knows the rules or when only one side holds privileged information?'
    },
    tag: 'dilemma',
    difficulty: 'mastermind',
    categories: ['jogos', 'investigacao', 'tecnologia']
  },
  {
    id: 'q27',
    text: {
      pt: 'Se você recebesse um convite misterioso envolvendo isso hoje à noite, iria por curiosidade ou recusaria por cautela?',
      en: 'If you got a mysterious invite involving this tonight, would curiosity pull you in or caution keep you away?'
    },
    tag: 'dilemma',
    difficulty: 'balanced'
  },
  {
    id: 'q28',
    text: {
      pt: 'O que torna isso mais memorável: a expectativa antes, o momento exato ou a consequência depois?',
      en: 'What makes this most memorable: the buildup before, the exact moment, or the aftermath?'
    },
    tag: 'psychological',
    difficulty: 'tactical'
  },
  {
    id: 'q29',
    text: {
      pt: 'Se isso falhasse diante de uma plateia, pareceria cômico ou trágico?',
      en: 'If this failed in front of an audience, would it come across as comedic or tragic?'
    },
    tag: 'scenario',
    difficulty: 'tactical',
    categories: ['arte_cinema', 'esportes', 'situacoes']
  },
  {
    id: 'q30',
    text: {
      pt: 'Qual detalhe pequeno quase ninguém nota nisso, mas que faz toda a diferença?',
      en: 'What small detail does almost nobody notice here that actually changes everything?'
    },
    tag: 'bluff',
    difficulty: 'mastermind'
  },
  {
    id: 'q31',
    text: {
      pt: 'Isso combina mais com improviso sob pressão ou com preparação meticulosa?',
      en: 'Does this belong more to improvisation under pressure or meticulous preparation?'
    },
    tag: 'dilemma',
    difficulty: 'balanced'
  },
  {
    id: 'q32',
    text: {
      pt: 'Se você encontrasse vestígios disso na casa de um desconhecido, ficaria intrigado ou preocupado?',
      en: 'If you found traces of this at a stranger’s house, would you feel intrigued or concerned?'
    },
    tag: 'psychological',
    difficulty: 'tactical'
  },
  {
    id: 'q33',
    text: {
      pt: 'Em qual estação do ano ou horário do dia isso parece ganhar mais força?',
      en: 'Which season of the year or time of day makes this feel most intense?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q34',
    text: {
      pt: 'Isso pode ser comprado com facilidade ou precisa ser conquistado, construído ou aguardado?',
      en: 'Can this be bought easily, or must it be earned, built, or waited for?'
    },
    tag: 'bluff',
    difficulty: 'tactical'
  },
  {
    id: 'q35',
    text: {
      pt: 'Se o seu pior inimigo dominasse isso antes de você, o quanto você estaria em desvantagem?',
      en: 'If your worst rival mastered this before you did, how disadvantaged would you be?'
    },
    tag: 'dilemma',
    difficulty: 'mastermind'
  },
  {
    id: 'q36',
    text: {
      pt: 'Qual sentido humano (visão, audição, tato, olfato ou intuição) é mais enganado ou exigido por isso?',
      en: 'Which human sense (sight, hearing, touch, smell, or gut instinct) is most fooled or tested by this?'
    },
    tag: 'psychological',
    difficulty: 'tactical'
  },
  {
    id: 'q37',
    text: {
      pt: 'Se alguém jurasse nunca mais chegar perto disso, você acreditaria no trauma ou acharia exagero?',
      en: 'If someone swore never to go near this again, would you respect the trauma or think it’s dramatic?'
    },
    tag: 'scenario',
    difficulty: 'balanced'
  },
  {
    id: 'q38',
    text: {
      pt: 'Isso existia da mesma forma há 100 anos ou só faz sentido no mundo moderno?',
      en: 'Did this exist in a similar form 100 years ago, or does it only make sense in the modern world?'
    },
    tag: 'bluff',
    difficulty: 'balanced'
  },
  {
    id: 'q39',
    text: {
      pt: 'Se um filme fosse feito sobre isso hoje, seria mais próximo de um suspense policial ou de um drama psicológico?',
      en: 'If a movie were made about this today, would it lean closer to a crime thriller or a psychological drama?'
    },
    tag: 'scenario',
    difficulty: 'tactical'
  },
  {
    id: 'q40',
    text: {
      pt: 'Quando alguém tenta fingir que entende disso, qual é o primeiro sinal que entrega a farsa?',
      en: 'When someone tries to fake knowing about this, what is the first clue that gives them away?'
    },
    tag: 'bluff',
    difficulty: 'mastermind'
  }
];

export const ROUND_TWISTS: TwistModifier[] = [
  {
    id: 'twist_word_limit',
    icon: '✂️',
    title: { pt: 'Protocolo Econômico', en: 'Briefing Protocol' },
    desc: {
      pt: 'Cada jogador só pode responder perguntas usando no máximo 8 palavras por turno.',
      en: 'Each player may answer questions using at most 8 words per turn.'
    }
  },
  {
    id: 'twist_no_yes_no',
    icon: '🚫',
    title: { pt: 'Sem Sim ou Não', en: 'No Yes or No' },
    desc: {
      pt: 'É proibido responder "sim", "não" ou "talvez". Toda resposta precisa de justificativa.',
      en: 'Saying "yes", "no", or "maybe" is forbidden. Every answer needs reasoning.'
    }
  },
  {
    id: 'twist_one_follow_up',
    icon: '🔎',
    title: { pt: 'Direito de Réplica', en: 'Cross-Examination' },
    desc: {
      pt: 'Após cada resposta, o grupo pode fazer 1 pergunta relâmpago de acompanhamento para a mesma pessoa.',
      en: 'After each answer, the group gets 1 rapid follow-up question for that same player.'
    }
  },
  {
    id: 'twist_devils_advocate',
    icon: '⚖️',
    title: { pt: 'Advogado do Diabo', en: 'Devil’s Advocate' },
    desc: {
      pt: 'Antes da votação, quem estiver à esquerda do mais acusado deve defendê-lo por 15 segundos.',
      en: 'Before voting, the player to the left of the top suspect must defend them for 15 seconds.'
    }
  },
  {
    id: 'twist_metaphor_only',
    icon: '🎭',
    title: { pt: 'Código Metafórico', en: 'Metaphor Code' },
    desc: {
      pt: 'Descreva sua relação com o segredo usando apenas comparações, climas ou sensações.',
      en: 'Describe your connection to the secret using only comparisons, moods, or sensations.'
    }
  },
  {
    id: 'twist_silent_stare',
    icon: '👁️',
    title: { pt: 'Olhar Frio', en: 'Cold Stare' },
    desc: {
      pt: 'Ninguém pode comentar durante a resposta de outro jogador — apenas anotar suspeitas em silêncio.',
      en: 'No interrupting or reacting during someone’s answer — observe silently.'
    }
  },
  {
    id: 'twist_two_truths',
    icon: '🃏',
    title: { pt: 'Meia-Verdade', en: 'Half-Truth' },
    desc: {
      pt: 'Cada resposta deve soar plausível o bastante para não entregar o segredo ao Impostor de bandeja.',
      en: 'Keep answers subtle enough not to hand the secret to the Impostor on a silver platter.'
    }
  },
  {
    id: 'twist_reverse_order',
    icon: '🔄',
    title: { pt: 'Fogo Cruzado', en: 'Crossfire' },
    desc: {
      pt: 'Quem respondeu uma pergunta escolhe livremente quem será o próximo alvo da mesa.',
      en: 'Whoever just answered chooses the next player at the table to be questioned.'
    }
  }
];
