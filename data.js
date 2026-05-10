const GIFTS = [
  {
    id: "sacos-cimento",
    nome: "Sacos de cimento para a fundacao do nosso amor",
    descricao: "Ajuda a manter este projeto conjugal em pe... e sem rachaduras.",
    valor: 30,
    categoria: "Obras romanticas",
    imagem: "images/cimento.jpeg"
  },
  {
    id: "carrinho-de-carga",
    nome: "Carrinho de carga para transportar as malas da lua de mel",
    descricao: "Facilita o transporte dos sonhos e das roupas de praia.",
    valor: 35,
    categoria: "Obras romanticas",
    imagem: "images/carrinho_peso.jpeg"
  },
  {
    id: "forno-eletrico",
    nome: "Forno elétrico para assar o amor em alta temperatura",
    descricao: "Perfeito para as receitas de amor que exigem um toque de calor e dedicação.",
    valor: 35,
    categoria: "Obras romanticas",
    imagem: "images/forno.jpeg"
  },
  {
    id: "porta-interior",
    nome: "Porta interior para os momentos de privacidade (e para esconder os presentes que ainda nao escolhemos)",
    descricao: "Para criar um espaço de paz e tranquilidade quando o casamento ficar muito intenso.",
    valor: 60,
    categoria: "Casa com humor",
    imagem: "images/porta2.jpeg"
  },
  {
    id: "argamassa",
    nome: "Argamassa para manter este casamento bem colado",
    descricao: "Para unir coracoes e tambem os azulejos sem sobrar nada.",
    valor: 40,
    categoria: "Obras romanticas",
    imagem: "images/cimento.jpeg"
  },
  {
    id: "escada",
    nome: "Escada para o noivo alcançar as prateleiras mais altas (e os sonhos mais altos)",
    descricao: "Subir na vida a dois, um degrau de cada vez.",
    valor: 50,
    categoria: "Casa com humor",
    imagem: "images/escada.jpeg"
  },
  {
    id: "janela-fofoqueira",
    nome: "Janela fofoqueira para espiar os vizinhos (e as visitas indesejadas)",
    descricao: "Porque um pouco de curiosidade nunca fez mal a um casamento... ou fez?",
    valor: 60,
    categoria: "Casa com humor",
    imagem: "images/fofoqueira.jpeg"
  },
  {
    id: "azulejos-cozinha",
    nome: "Azulejos para a cozinha de campo",
    descricao: "Para os jantares romanticos e os improvisos de ultima hora.",
    valor: 85,
    categoria: "Cozinha",
    imagem: "images/cozinha.jpeg"
  },
  {
    id: "EPIs",
    nome: "EPIs para os projetos de bricolage que vao acabar sempre em mais ferramentas",
    descricao: "Seguranca em primeiro lugar, mesmo quando o projeto é só pendurar um quadro.",
    valor: 30,
    categoria: "Obras romanticas",
    imagem: "images/capacete.jpeg"
  },
  {
    id: "porta-blindada",
    nome: "Porta blindada para impedir a entrada de boletos indesejados",
    descricao: "Seguranca maxima contra visitas nao convidadas e contas misteriosas.",
    valor: 150,
    categoria: "Casa com humor",
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
