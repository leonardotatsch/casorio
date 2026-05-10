const GIFTS = [
  {
    id: "sacos-cimento",
    nome: "Sacos de cimento para a fundacao do nosso amor",
    valor: 30,
    imagem: "images/cimento.jpeg"
  },
  {
    id: "carrinho-de-carga",
    nome: "Carrinho de carga para transportar as cestas de legumes",
    valor: 35,
    imagem: "images/carrinho_peso.jpeg"
  },
  {
    id: "forno-eletrico",
    nome: "Forno elétrico para os assados de domingo com amigos",
    valor: 35,
    imagem: "images/forno.jpeg"
  },
  {
    id: "porta-interior",
    nome: "Porta interior para os momentos de privacidade",
    valor: 60,
    imagem: "images/porta2.jpeg"
  },
  {
    id: "argamassa",
    nome: "Argamassa para manter este casamento bem colado",
    valor: 40,
    imagem: "images/cimento.jpeg"
  },
  {
    id: "escada",
    nome: "Escada para o noivo alcançar as laranjas mais bonitas do pé",
    valor: 50,
    imagem: "images/escada.jpeg"
  },
  {
    id: "janela-fofoqueira",
    nome: "Janela  para espiar os vizinhos",
    valor: 60,
    imagem: "images/fofoqueira.jpeg"
  },
  {
    id: "azulejos-cozinha",
    nome: "Azulejos para a cozinha de campo",
    valor: 85,
    imagem: "images/cozinha.jpeg"
  },
  {
    id: "EPIs",
    nome: "EPIs para os projetos de bricolage que vao acabar sempre em mais ferramentas",
    valor: 30,
    imagem: "images/capacete.jpeg"
  },
  {
    id: "porta-blindada",
    nome: "Porta blindada para impedir a entrada de boletos indesejados",
    valor: 150,
    imagem: "images/porta.jpeg"
  }
];

const RESERVATION_KEY = "casorio_reserved_gifts";
const CONTACT_CONFIG = {
  whatsappNumber: "351965885868",
  mbway: "+351 913070317 ou +351 965885868",
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
