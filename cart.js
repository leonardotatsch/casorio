function renderCart() {
  const cartState = document.getElementById("cartState");
  const cartList = document.getElementById("cartList");
  const summary = document.getElementById("cartSummary");
  const summaryCount = document.getElementById("summaryCount");
  const summaryTotal = document.getElementById("summaryTotal");

  if (!cartState || !cartList || !summary || !summaryCount || !summaryTotal) {
    return;
  }

  const reservations = getReservations();
  const reservedItems = GIFTS.filter((gift) => reservations.includes(gift.id));

  if (reservedItems.length === 0) {
    cartState.classList.remove("hidden");
    cartList.innerHTML = "";
    summary.classList.add("hidden");
    return;
  }

  cartState.classList.add("hidden");

  cartList.innerHTML = reservedItems.map((gift) => `
    <article class="cart-item">
      <h3>${gift.nome}</h3>
      <p>${gift.descricao}</p>
      <strong>${moneyBRL(gift.valor)}</strong>
    </article>
  `).join("");

  const total = reservedItems.reduce((sum, item) => sum + item.valor, 0);

  summaryCount.textContent = String(reservedItems.length);
  summaryTotal.textContent = moneyBRL(total);
  summary.classList.remove("hidden");
}

renderCart();
