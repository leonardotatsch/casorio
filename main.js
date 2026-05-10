function renderGifts() {
  const list = document.getElementById("giftList");
  if (!list) {
    return;
  }

  const reservations = getReservations();

  list.innerHTML = GIFTS.map((gift, index) => {
    const reserved = reservations.includes(gift.id);
    const btnText = reserved ? "Reservado" : "Reservar presente";
    const btnClass = reserved ? "reserve-btn reserved" : "reserve-btn";
    const msg = [
      "Ola, Helena e Leo!",
      `Quero oferecer este presente: ${gift.nome} (${moneyEUR(gift.valor)}).`,
      "Podem marcar como reservado, por favor?"
    ].join("\n");
    const waLink = buildWhatsAppLink(msg);

    return `
      <article class="gift-card" style="animation-delay:${Math.min(index * 60, 280)}ms">
        <div class="gift-meta">
          <span class="badge">${gift.categoria}</span>
        </div>
        <h3>${gift.nome}</h3>
        <p>${gift.descricao}</p>
        <span class="price">${moneyEUR(gift.valor)}</span>
        <div class="card-actions">
          <button class="${btnClass}" type="button" data-gift-id="${gift.id}">${btnText}</button>
          <a class="wa-btn" href="${waLink}" target="_blank" rel="noopener noreferrer">Informar no WhatsApp</a>
        </div>
      </article>
    `;
  }).join("");

  list.querySelectorAll("[data-gift-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const giftId = btn.getAttribute("data-gift-id");
      if (!giftId) {
        return;
      }

      toggleReservation(giftId);
      renderGifts();
    });
  });
}

function setupClearButton() {
  const clearBtn = document.getElementById("clearReservationsBtn");
  if (!clearBtn) {
    return;
  }

  clearBtn.addEventListener("click", () => {
    clearReservations();
    renderGifts();
  });
}

function setupPaymentInfo() {
  const mbwayInfo = document.getElementById("mbwayInfo");
  const ibanInfo = document.getElementById("ibanInfo");
  const whatsappGeneralLink = document.getElementById("whatsappGeneralLink");

  if (mbwayInfo) {
    mbwayInfo.textContent = CONTACT_CONFIG.mbway;
  }

  if (ibanInfo) {
    ibanInfo.textContent = CONTACT_CONFIG.iban;
  }

  if (whatsappGeneralLink) {
    const msg = [
      "Ola, Helena e Leo!",
      "Vou participar no presente de casamento e queria confirmar os dados de pagamento.",
      "Obrigada/o!"
    ].join("\n");
    whatsappGeneralLink.href = buildWhatsAppLink(msg);
  }
}

renderGifts();
setupClearButton();
setupPaymentInfo();
