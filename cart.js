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
      <strong>${moneyEUR(gift.valor)}</strong>
    </article>
  `).join("");

  const total = reservedItems.reduce((sum, item) => sum + item.valor, 0);

  summaryCount.textContent = String(reservedItems.length);
  summaryTotal.textContent = moneyEUR(total);
  summary.classList.remove("hidden");
}

function setupPaymentInfo() {
  const mbwayInfo = document.getElementById("mbwayInfo");
  const ibanInfo = document.getElementById("ibanInfo");
  const cartWhatsAppLink = document.getElementById("cartWhatsAppLink");
  const lunchInfoLinkCart = document.getElementById("lunchInfoLinkCart");

  if (mbwayInfo) {
    mbwayInfo.textContent = CONTACT_CONFIG.mbway;
  }

  if (ibanInfo) {
    ibanInfo.textContent = CONTACT_CONFIG.iban;
  }

  if (cartWhatsAppLink) {
    const reservations = getReservations();
    const reservedItems = GIFTS.filter((gift) => reservations.includes(gift.id));
    const giftLines = reservedItems.length > 0
      ? reservedItems.map((gift) => `- ${gift.nome} (${moneyEUR(gift.valor)})`).join("\n")
      : "- ainda vou escolher o presente";

    const msg = [
      "Ola, Helena e Leo!",
      "Quero confirmar o meu presente de casamento:",
      giftLines,
      "Vou fazer o pagamento por MB Way ou transferencia."
    ].join("\n");

    cartWhatsAppLink.href = buildWhatsAppLink(msg);
  }

  if (lunchInfoLinkCart) {
    lunchInfoLinkCart.href = CONTACT_CONFIG.lunchInfoUrl || "#";
  }
}

function setupClearCartButton() {
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (!clearCartBtn) {
    return;
  }

  clearCartBtn.addEventListener("click", () => {
    clearReservations();
    renderCart();
    setupPaymentInfo();
  });
}

renderCart();
setupPaymentInfo();
setupClearCartButton();
