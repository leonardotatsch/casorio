const GIFTS = [
  {
    id: "jantar-romantico",
    nome: "Jantar romântico",
    descricao: "Uma noite especial para celebrarmos a nova fase.",
    valor: 180,
    categoria: "Experiências"
  },
  {
    id: "jogo-pratos",
    nome: "Jogo de pratos",
    descricao: "Conjunto de 12 peças para refeições em família.",
    valor: 240,
    categoria: "Casa"
  },
  {
    id: "cafeteira",
    nome: "Cafeteira",
    descricao: "Para começar os dias com café fresquinho.",
    valor: 320,
    categoria: "Eletro"
  },
  {
    id: "edredom-queen",
    nome: "Edredom Queen",
    descricao: "Conforto extra para as noites do novo lar.",
    valor: 290,
    categoria: "Quarto"
  },
  {
    id: "airfryer",
    nome: "Airfryer",
    descricao: "Praticidade para receitas rápidas no dia a dia.",
    valor: 410,
    categoria: "Eletro"
  },
  {
    id: "lua-de-mel",
    nome: "Cota lua de mel",
    descricao: "Ajuda para um passeio inesquecível na viagem.",
    valor: 150,
    categoria: "Experiências"
  },
  {
    id: "ta-casando",
    nome: "Taças de vinho",
    descricao: "Jogo com 6 taças para brindar bons momentos.",
    valor: 160,
    categoria: "Casa"
  },
  {
    id: "aspirador-robo",
    nome: "Aspirador robô",
    descricao: "Tecnologia para facilitar a rotina da casa.",
    valor: 780,
    categoria: "Eletro"
  }
];

const RESERVATION_KEY = "casorio_reserved_gifts";
const CONTACT_CONFIG = {
  whatsappNumber: "351910000000",
  mbway: "910000000",
  iban: "PT50XXXXX"
};

function moneyEUR(value) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function buildWhatsAppLink(message) {
  const digits = CONTACT_CONFIG.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

function getReservations() {
  try {
    const raw = localStorage.getItem(RESERVATION_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveReservations(ids) {
  localStorage.setItem(RESERVATION_KEY, JSON.stringify(ids));
}

function isReserved(giftId) {
  return getReservations().includes(giftId);
}

function toggleReservation(giftId) {
  const reservations = getReservations();
  const alreadyReserved = reservations.includes(giftId);
  const next = alreadyReserved
    ? reservations.filter((id) => id !== giftId)
    : [...reservations, giftId];

  saveReservations(next);
  return !alreadyReserved;
}

function clearReservations() {
  localStorage.removeItem(RESERVATION_KEY);
}
