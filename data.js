const GIFTS = [
  {
    id: "sacos-cimento",
    nome: "Sacos de cimento para a fundacao do nosso amor",
    descricao: "Ajuda a manter este projeto conjugal em pe... e sem rachaduras.",
    valor: 30,
    categoria: "Obras romanticas",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "tinta-branca",
    nome: "Tinta branca para apagar o passado de solteiros",
    descricao: "Uma camada por cima das historias comprometedoras dos tempos de balada.",
    valor: 35,
    categoria: "Obras romanticas",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "kit-pintura-noivo",
    nome: "Kit de pintura para o noivo fingir que e o Michelangelo",
    descricao: "Talento duvidoso, entusiasmo garantido.",
    valor: 35,
    categoria: "Obras romanticas",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "interruptores",
    nome: "Interruptores para quando um de nos estiver desligado",
    descricao: "Essenciais para religar a conversa depois de cada drama.",
    valor: 40,
    categoria: "Casa com humor",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "argamassa",
    nome: "Argamassa para manter este casamento bem colado",
    descricao: "Para unir coracoes e tambem os azulejos sem sobrar nada.",
    valor: 40,
    categoria: "Obras romanticas",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "luminarias",
    nome: "Luminarias para vermos quem deixou a louca por lavar",
    descricao: "Sem desculpa de luz fraca na hora de achar o culpado.",
    valor: 50,
    categoria: "Casa com humor",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "fechaduras-sogra",
    nome: "Fechaduras para quando a sogra decidir aparecer sem avisar",
    descricao: "Seguranca preventiva para manter a paz domestica.",
    valor: 60,
    categoria: "Defesa da casa",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "azulejos-cozinha",
    nome: "Azulejos para a cozinha de campo",
    descricao: "Para os jantares romanticos e os improvisos de ultima hora.",
    valor: 85,
    categoria: "Cozinha",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "tinta-colorida",
    nome: "Tinta colorida para os dias cinzentos",
    descricao: "Porque segunda-feira merece ao menos uma parede feliz.",
    valor: 95,
    categoria: "Obras romanticas",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "trono-real",
    nome: "Trono real para momentos de meditacao (Vaso Sanitario)",
    descricao: "O assento oficial para grandes reflexoes matrimoniais.",
    valor: 105,
    categoria: "Casa com humor",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "bancada-oficina",
    nome: "Bancada de trabalho para a oficina do noivo",
    descricao: "Para projetos serios que acabam sempre em mais ferramentas.",
    valor: 115,
    categoria: "Oficina",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "termoacumulador",
    nome: "Termoacumulador para nao termos que tomar banho de agua fria apos a primeira discussao",
    descricao: "Paz conjugal tambem depende da temperatura ideal.",
    valor: 135,
    categoria: "Conforto",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "lava-loica",
    nome: "Lava-loica para quem perder no par ou impar",
    descricao: "Justica domestica automatica para evitar debates eternos.",
    valor: 150,
    categoria: "Cozinha",
    imagem: "images/placeholder-gift.svg"
  },
  {
    id: "porta-blindada",
    nome: "Porta blindada para impedir a entrada de boletos indesejados",
    descricao: "Seguranca maxima contra visitas nao convidadas e contas misteriosas.",
    valor: 150,
    categoria: "Defesa da casa",
    imagem: "images/placeholder-gift.svg"
  }
];

const RESERVATION_KEY = "casorio_reserved_gifts";
const CONTACT_CONFIG = {
  whatsappNumber: "351910000000",
  mbway: "910000000",
  iban: "PT50XXXXX",
  lunchInfoUrl: "#"
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
