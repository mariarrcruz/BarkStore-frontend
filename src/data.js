// Imagens reais (arquivos em /assets)
export const images = {
  logo: require('../assets/BarkStoreLogo.png'),
  dog: require('../assets/dog.png'),
  cat: require('../assets/cat-banner.png'),
};

export const categories = [
  { id: 'gato', title: 'Comida para gato', emoji: '🐱', color: '#FBCFE8' },
  { id: 'cachorro', title: 'Comida para cachorro', emoji: '🐶', color: '#BAE6FD' },
  { id: 'petiscos', title: 'Petiscos', emoji: '🦴', color: '#E9D5FF' },
  { id: 'higiene', title: 'Higiene', emoji: '🧼', color: '#A7F3D0' },
  { id: 'brinquedos', title: 'Brinquedos', emoji: '🧸', color: '#FDE68A' },
  { id: 'saude', title: 'Saúde', emoji: '💊', color: '#FECACA' },
  { id: 'acessorios', title: 'Acessórios', emoji: '🦮', color: '#C7D2FE' },
];

export const products = [
  { id: 1, featured: true, name: 'Special Dog Prime para Cães Adultos de Raças Grandes', shortName: 'Special Dog Prime', categories: ['cachorro'], price: 234.9, rating: 4.8, reviews: 124, image: require('../assets/prime.png'), emoji: '🐕', bg: '#E5E7EB',
    description: 'Ração premium completa e balanceada para cães adultos de raças grandes. Ingredientes selecionados para uma alimentação saudável e saborosa.' },
  { id: 2, featured: true, name: 'Petisco Cremoso True Creamy Sabor Frango para Gatos', shortName: 'True Creamy Frango', categories: ['gato', 'petiscos'], price: 22.41, rating: 4.9, reviews: 86, image: require('../assets/creamy.png'), emoji: '🍗', bg: '#E5E7EB',
    description: 'Petisco cremoso sabor frango para gatos. Pacote com 5 unidades, ideal para premiar e dar mais prazer na hora do petisco.' },
  { id: 3, featured: true, name: 'Antipulgas Simparic 20 mg para Cães 5,1 a 10 kg', shortName: 'Simparic 20 mg', categories: ['saude'], price: 82.5, rating: 4.7, reviews: 53, image: require('../assets/simparic.png'), emoji: '💊', bg: '#E5E7EB',
    description: 'Antipulgas e carrapatos de ação rápida, mastigável, com proteção por até 35 dias. Uso veterinário.' },

  { id: 4, featured: true, name: 'Shampoo Neutro Petbrilho Suavidade sem Lágrimas 500 ml', shortName: 'Shampoo Petbrilho', categories: ['higiene'], price: 19.9, rating: 4.6, reviews: 53, image: require('../assets/shampoo.png'), emoji: '🧴', bg: '#E5E7EB',
    description: 'Shampoo neutro para cães e gatos, com fórmula suave sem lágrimas. Frasco de 500 ml.' },
  { id: 5, name: 'Cama Pet de Tecido Resistente Cinza', shortName: 'Cama Pet', categories: ['acessorios'], price: 64.9, rating: 4.9, reviews: 41, image: require('../assets/cama-pet.png'), emoji: '🛏️', bg: '#E5E7EB',
    description: 'Cama macia e confortável, com bordas elevadas e tecido resistente, para o descanso do seu pet.' },
  { id: 6, featured: true, name: 'Ração Golden Gatos Adultos Frango 3 kg', shortName: 'Golden Gatos Adultos', categories: ['gato'], price: 129.9, rating: 4.8, reviews: 97, image: require('../assets/racao-gatos.png'), emoji: '🐱', bg: '#E5E7EB',
    description: 'Ração premium especial para gatos adultos sabor frango, pacote de 3 kg.' },
  { id: 7, name: 'Bolinha de Borracha Maciça', shortName: 'Bolinha de Borracha', categories: ['brinquedos', 'cachorro'], price: 14.9, rating: 4.5, reviews: 72, image: require('../assets/bola-borracha.png'), emoji: '🎾', bg: '#E5E7EB',
    description: 'Bolinha maciça de borracha com cravos, resistente e ótima para brincar de buscar.' },
  { id: 8, name: 'Mordedor Osso de Nylon Buddy para Cães Médios e Grandes', shortName: 'Mordedor Osso Nylon', categories: ['brinquedos', 'cachorro'], price: 29.9, rating: 4.7, reviews: 64, image: require('../assets/osso-nylon.png'), emoji: '🦴', bg: '#E5E7EB',
    description: 'Osso de nylon para cães que adoram roer. Ajuda na limpeza dos dentes. Indicado para cães de porte médio e grande.' },
  { id: 9, name: 'Petisco Petiscão Bifinho Sabor Carne 500 g', shortName: 'Bifinho Petiscão', categories: ['petiscos', 'cachorro'], price: 27.9, rating: 4.8, reviews: 110, image: require('../assets/bifinho-carne.png'), emoji: '🥩', bg: '#E5E7EB',
    description: 'Tabletes de bifinho sabor carne, perfeitos para premiar e treinar. Pacote de 500 g.' },
  { id: 10, name: 'Areia Higiênica Pipicat Classic para Gatos 4 kg', shortName: 'Areia Pipicat Classic', categories: ['higiene', 'gato'], price: 24.9, rating: 4.6, reviews: 88, image: require('../assets/areia-higienica.png'), emoji: '🪣', bg: '#E5E7EB',
    description: 'Granulado sanitário de grãos finos, com melhor absorção, torrões firmes e controle de odores. Pacote de 4 kg.' },
  { id: 11, name: 'Peitoral Ajustável para Cães Tamanho M', shortName: 'Peitoral Ajustável', categories: ['acessorios', 'cachorro'], price: 39.9, rating: 4.7, reviews: 35, image: require('../assets/peitoral.png'), emoji: '🦮', bg: '#E5E7EB',
    description: 'Peitoral ajustável em malha respirável com detalhes refletivos, confortável para passeios.' },
  { id: 12, name: 'Suplemento Vitamínico Nutrafases para Cães 60 tabletes', shortName: 'Suplemento Vitamínico', categories: ['saude', 'cachorro'], price: 69.9, rating: 4.6, reviews: 29, image: require('../assets/suplemento.png'), emoji: '💊', bg: '#E5E7EB',
    description: 'Suplemento alimentar em tabletes mastigáveis, fonte de vitaminas. Consulte seu médico veterinário.' },
  { id: 13, name: 'Arranhador para Gatos com Sisal e Brinquedo', shortName: 'Arranhador de Sisal', categories: ['brinquedos', 'gato'], price: 89.9, rating: 4.9, reviews: 47, image: require('../assets/arranhador.png'), emoji: '🐈', bg: '#E5E7EB',
    description: 'Arranhador com poste revestido de sisal e brinquedo pendurado, protege os móveis e diverte o gato.' },
];

export const initialUser = { name: 'Thales Lopes', email: 'thales@email.com', phone: '' };

export const initialOrders = [
  { id: 'BS245873', date: '14/09/2026', status: 'Entregue', total: 257.31, items: [{ name: 'Special Dog Prime para Cães Adultos de Raças Grandes', qty: 1, price: 234.9 }, { name: 'Petisco Cremoso True Creamy Sabor Frango para Gatos', qty: 1, price: 22.41 }] },
  { id: 'BS198442', date: '02/08/2026', status: 'Entregue', total: 82.5, items: [{ name: 'Antipulgas Simparic 20 mg para Cães 5,1 a 10 kg', qty: 1, price: 82.5 }] },
];

export const initialPets = [
  { id: 1, name: 'Thor', type: 'Cão', emoji: '🐶', desc: 'Golden Retriever • 3 anos' },
  { id: 2, name: 'Luna', type: 'Gato', emoji: '🐱', desc: 'Gato SRD • 2 anos' },
];

export const frequencies = [
  { label: 'A cada 15 dias', days: 15 },
  { label: 'A cada 30 dias', days: 30 },
  { label: 'A cada 45 dias', days: 45 },
  { label: 'A cada 60 dias', days: 60 },
];

export const initialPlans = [
  { id: 1, petId: 1, productIds: [1, 3], days: 30, nextDelivery: '14/10/2026' },
  { id: 2, petId: 2, productIds: [2], days: 45, nextDelivery: '29/10/2026' },
];

export const initialAddresses = [{ id: 1, name: 'Casa', street: 'Rua das Flores', number: '123', district: 'Morumbi' }];
export const initialCards = [{ id: 1, label: 'Cartão de crédito', last4: '4582' }];
export const paymentMethods = ['Cartão de crédito', 'PIX', 'Boleto'];
export const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];