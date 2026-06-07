import { Category } from '../types';

export const CATEGORIES: Record<string, Category> = {
  comidas: {
    id: 'comidas',
    name: { pt: 'Comidas 🍔', en: 'Food 🍔' },
    icon: '🍔',
    desc: {
      pt: 'Assuntos deliciosos, mas diga a palavra errada e você será frito!',
      en: 'Tasty topics, but tell the wrong thing and you are toast!'
    },
    color: 'from-orange-500 to-amber-600',
    words: [
      {
        word: { pt: 'Pizza', en: 'Pizza' },
        hint: { pt: 'Fatia', en: 'Slice' }
      },
      {
        word: { pt: 'Hambúrguer', en: 'Burger' },
        hint: { pt: 'Lanche', en: 'Snack' }
      },
      {
        word: { pt: 'Lasanha', en: 'Lasagna' },
        hint: { pt: 'Massa', en: 'Pasta' }
      },
      {
        word: { pt: 'Sushi', en: 'Sushi' },
        hint: { pt: 'Peixe', en: 'Fish' }
      },
      {
        word: { pt: 'Chocolate', en: 'Chocolate' },
        hint: { pt: 'Doce', en: 'Sweet' }
      },
      {
        word: { pt: 'Sorvete', en: 'Ice Cream' },
        hint: { pt: 'Calor', en: 'Heat' }
      },
      {
        word: { pt: 'Bolo', en: 'Cake' },
        hint: { pt: 'Festa', en: 'Party' }
      },
      {
        word: { pt: 'Pastel', en: 'Deep-fried Pastry' },
        hint: { pt: 'Feira', en: 'Market' }
      },
      {
        word: { pt: 'Feijoada', en: 'Bean Stew' },
        hint: { pt: 'Sábado', en: 'Saturday' }
      },
      {
        word: { pt: 'Macarrão', en: 'Pasta' },
        hint: { pt: 'Molho', en: 'Sauce' }
      }
    ]
  },
  objetos: {
    id: 'objetos',
    name: { pt: 'Objetos 📱', en: 'Objects 📱' },
    icon: '📱',
    desc: {
      pt: 'Coisas comuns do cotidiano que você usa sem perceber.',
      en: 'Everyday common objects you use without noticing.'
    },
    color: 'from-blue-500 to-cyan-600',
    words: [
      {
        word: { pt: 'Celular', en: 'Smartphone' },
        hint: { pt: 'Tela', en: 'Screen' }
      },
      {
        word: { pt: 'Notebook', en: 'Laptop' },
        hint: { pt: 'Teclado', en: 'Keyboard' }
      },
      {
        word: { pt: 'Controle Remoto', en: 'Remote Control' },
        hint: { pt: 'Pilha', en: 'Battery' }
      },
      {
        word: { pt: 'Cadeira', en: 'Chair' },
        hint: { pt: 'Sentar', en: 'Sit' }
      },
      {
        word: { pt: 'Garrafa', en: 'Bottle' },
        hint: { pt: 'Plástico', en: 'Plastic' }
      },
      {
        word: { pt: 'Travesseiro', en: 'Pillow' },
        hint: { pt: 'Cama', en: 'Bed' }
      },
      {
        word: { pt: 'Relógio', en: 'Wristwatch' },
        hint: { pt: 'Hora', en: 'Time' }
      },
      {
        word: { pt: 'Mochila', en: 'Backpack' },
        hint: { pt: 'Costas', en: 'Back' }
      },
      {
        word: { pt: 'Chave', en: 'Key' },
        hint: { pt: 'Porta', en: 'Door' }
      },
      {
        word: { pt: 'Televisão', en: 'Television' },
        hint: { pt: 'Filme', en: 'Movie' }
      }
    ]
  },
  cidades: {
    id: 'cidades',
    name: { pt: 'Cidades 🌎', en: 'Cities 🌎' },
    icon: '🌎',
    desc: {
      pt: 'Grandes metrópoles do mundo todo e segredos urbanos.',
      en: 'Major metropolises around the world and urban secrets.'
    },
    color: 'from-indigo-500 to-purple-600',
    words: [
      {
        word: { pt: 'Porto Velho', en: 'Porto Velho' },
        hint: { pt: 'Rio', en: 'River' }
      },
      {
        word: { pt: 'São Paulo', en: 'Sao Paulo' },
        hint: { pt: 'Prédio', en: 'Building' }
      },
      {
        word: { pt: 'Rio de Janeiro', en: 'Rio de Janeiro' },
        hint: { pt: 'Praia', en: 'Beach' }
      },
      {
        word: { pt: 'Paris', en: 'Paris' },
        hint: { pt: 'Torre', en: 'Tower' }
      },
      {
        word: { pt: 'Londres', en: 'London' },
        hint: { pt: 'Chuva', en: 'Rain' }
      },
      {
        word: { pt: 'Tóquio', en: 'Tokyo' },
        hint: { pt: 'Tecnologia', en: 'Technology' }
      },
      {
        word: { pt: 'Roma', en: 'Rome' },
        hint: { pt: 'Império', en: 'Empire' }
      },
      {
        word: { pt: 'Lisboa', en: 'Lisbon' },
        hint: { pt: 'Bacalhau', en: 'Cod' }
      },
      {
        word: { pt: 'Nova York', en: 'New York' },
        hint: { pt: 'Estátua', en: 'Statue' }
      },
      {
        word: { pt: 'Dubai', en: 'Dubai' },
        hint: { pt: 'Deserto', en: 'Desert' }
      }
    ]
  },
  animais: {
    id: 'animais',
    name: { pt: 'Animais 🐶', en: 'Animals 🐶' },
    icon: '🐶',
    desc: {
      pt: 'Do bicho de estimação ao predador selvagem - você consegue imitar?',
      en: 'From cute pets to wild predators - can you act normal?'
    },
    color: 'from-emerald-500 to-green-600',
    words: [
      {
        word: { pt: 'Cachorro', en: 'Dog' },
        hint: { pt: 'Osso', en: 'Bone' }
      },
      {
        word: { pt: 'Gato', en: 'Cat' },
        hint: { pt: 'Miau', en: 'Meow' }
      },
      {
        word: { pt: 'Leão', en: 'Lion' },
        hint: { pt: 'Juba', en: 'Mane' }
      },
      {
        word: { pt: 'Tigre', en: 'Tiger' },
        hint: { pt: 'Listras', en: 'Stripes' }
      },
      {
        word: { pt: 'Golfinho', en: 'Dolphin' },
        hint: { pt: 'Amigável', en: 'Friendly' }
      },
      {
        word: { pt: 'Cavalo', en: 'Horse' },
        hint: { pt: 'Galope Forte', en: 'Strong Gallop' }
      },
      {
        word: { pt: 'Elefante', en: 'Elephant' },
        hint: { pt: 'Tromba', en: 'Trunk' }
      },
      {
        word: { pt: 'Pinguim', en: 'Penguin' },
        hint: { pt: 'Frio', en: 'Cold' }
      },
      {
        word: { pt: 'Águia', en: 'Eagle' },
        hint: { pt: 'Voar', en: 'Fly' }
      },
      {
        word: { pt: 'Tubarão', en: 'Shark' },
        hint: { pt: 'Dentes', en: 'Teeth' }
      }
    ]
  },
  esportes: {
    id: 'esportes',
    name: { pt: 'Esportes ⚽', en: 'Sports ⚽' },
    icon: '⚽',
    desc: {
      pt: 'Práticas atléticas, cansaço, diversão e muita competição.',
      en: 'Athletic activities, exhaustion, fun, and competitive fire.'
    },
    color: 'from-yellow-500 to-amber-600',
    words: [
      {
        word: { pt: 'Futebol', en: 'Football/Soccer' },
        hint: { pt: 'Bola', en: 'Ball' }
      },
      {
        word: { pt: 'Basquete', en: 'Basketball' },
        hint: { pt: 'Cesta', en: 'Basket' }
      },
      {
        word: { pt: 'Vôlei', en: 'Volleyball' },
        hint: { pt: 'Rede', en: 'Net' }
      },
      {
        word: { pt: 'Tênis', en: 'Tennis' },
        hint: { pt: 'Raquete', en: 'Racket' }
      },
      {
        word: { pt: 'Natação', en: 'Swimming' },
        hint: { pt: 'Piscina', en: 'Pool' }
      },
      {
        word: { pt: 'Boxe', en: 'Boxing' },
        hint: { pt: 'Luva', en: 'Glove' }
      },
      {
        word: { pt: 'Surf', en: 'Surfing' },
        hint: { pt: 'Prancha', en: 'Board' }
      },
      {
        word: { pt: 'Skate', en: 'Skateboarding' },
        hint: { pt: 'Rodinhas', en: 'Wheels' }
      },
      {
        word: { pt: 'Corrida', en: 'Running' },
        hint: { pt: 'Tênis', en: 'Sneakers' }
      }
    ]
  },
  jogos: {
    id: 'jogos',
    name: { pt: 'Jogos 🎮', en: 'Games 🎮' },
    icon: '🎮',
    desc: {
      pt: 'Mundos virtuais, mundos de blocos, pixels e muita ação.',
      en: 'Virtual landscapes, pixelated adventures, blocks and action.'
    },
    color: 'from-purple-500 to-fuchsia-600',
    words: [
      {
        word: { pt: 'Minecraft', en: 'Minecraft' },
        hint: { pt: 'Blocos', en: 'Blocks' }
      },
      {
        word: { pt: 'Free Fire', en: 'Free Fire' },
        hint: { pt: 'Gás', en: 'Gas' }
      },
      {
        word: { pt: 'Roblox', en: 'Roblox' },
        hint: { pt: 'Plataforma', en: 'Platform' }
      },
      {
        word: { pt: 'Fortnite', en: 'Fortnite' },
        hint: { pt: 'Dancinha', en: 'Dance' }
      },
      {
        word: { pt: 'GTA', en: 'GTA' },
        hint: { pt: 'Polícia', en: 'Police' }
      },
      {
        word: { pt: 'Among Us', en: 'Among Us' },
        hint: { pt: 'Nave', en: 'Spaceship' }
      },
      {
        word: { pt: 'Clash Royale', en: 'Clash Royale' },
        hint: { pt: 'Cartas', en: 'Cards' }
      },
      {
        word: { pt: 'Brawl Stars', en: 'Brawl Stars' },
        hint: { pt: 'Brawler', en: 'Brawler' }
      }
    ]
  },
  profissoes: {
    id: 'profissoes',
    name: { pt: 'Profissões 👔', en: 'Professions 👔' },
    icon: '👔',
    desc: {
      pt: 'Trabalhos, carreiras e as obrigações que enchem o dia a dia.',
      en: 'Jobs, daily careers, and the routines people do for a living.'
    },
    color: 'from-teal-500 to-emerald-600',
    words: [
      {
        word: { pt: 'Médico', en: 'Doctor' },
        hint: { pt: 'Hospital', en: 'Hospital' }
      },
      {
        word: { pt: 'Bombeiro', en: 'Firefighter' },
        hint: { pt: 'Fogo', en: 'Fire' }
      },
      {
        word: { pt: 'Professor', en: 'Teacher' },
        hint: { pt: 'Escola', en: 'School' }
      },
      {
        word: { pt: 'Advogado', en: 'Lawyer' },
        hint: { pt: 'Tribunal', en: 'Court' }
      },
      {
        word: { pt: 'Programador', en: 'Programmer' },
        hint: { pt: 'Código', en: 'Code' }
      },
      {
        word: { pt: 'Piloto', en: 'Pilot' },
        hint: { pt: 'Avião', en: 'Plane' }
      },
      {
        word: { pt: 'Policial', en: 'Police Officer' },
        hint: { pt: 'Farda', en: 'Uniform' }
      },
      {
        word: { pt: 'Chef de Cozinha', en: 'Chef' },
        hint: { pt: 'Panela', en: 'Pot' }
      },
      {
        word: { pt: 'Engenheiro', en: 'Engineer' },
        hint: { pt: 'Obra', en: 'Construction' }
      }
    ]
  }
};
