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
    const imageSrc = gift.imagem || "images/placeholder-gift.svg";
    const imageAlt = `Imagem do presente ${gift.nome}`;

    return `
      <article class="gift-card" style="animation-delay:${Math.min(index * 60, 280)}ms">
        <img class="gift-thumb" src="${imageSrc}" alt="${imageAlt}" loading="lazy" />
        <div class="gift-meta">
          <span class="badge">${gift.categoria}</span>
        </div>
        <h3>${gift.nome}</h3>
        <p>${gift.descricao}</p>
        <span class="price">${moneyEUR(gift.valor)}</span>
        <div class="card-actions">
          <button class="${btnClass}" type="button" data-gift-id="${gift.id}">${btnText}</button>
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

function setupLunchInfoLink() {
  const lunchInfoLinkMain = document.getElementById("lunchInfoLinkMain");
  if (!lunchInfoLinkMain) {
    return;
  }

  lunchInfoLinkMain.href = CONTACT_CONFIG.lunchInfoUrl || "#";
}

renderGifts();
setupClearButton();
setupLunchInfoLink();
