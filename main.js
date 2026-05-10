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

    return `
      <article class="gift-card" style="animation-delay:${Math.min(index * 60, 280)}ms">
        <div class="gift-meta">
          <span class="badge">${gift.categoria}</span>
        </div>
        <h3>${gift.nome}</h3>
        <p>${gift.descricao}</p>
        <span class="price">${moneyBRL(gift.valor)}</span>
        <button class="${btnClass}" type="button" data-gift-id="${gift.id}">${btnText}</button>
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

renderGifts();
setupClearButton();
