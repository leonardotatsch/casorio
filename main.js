function openImageModal(src, alt) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  if (modal && modalImage) {
    modalImage.src = src;
    modalImage.alt = alt;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const closeBtn = document.querySelector(".modal-close");
  
  if (closeBtn) {
    closeBtn.addEventListener("click", closeImageModal);
  }
  
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }
}

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
        <img class="gift-thumb" src="${imageSrc}" alt="${imageAlt}" loading="lazy" style="cursor:pointer;" />
        <h3>${gift.nome}</h3>
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

  list.querySelectorAll(".gift-thumb").forEach((img) => {
    img.addEventListener("click", () => {
      openImageModal(img.src, img.alt);
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

function setupIntroToggle() {
  const introContent = document.getElementById("introContent");
  const toggleBtn = document.getElementById("toggleIntroBtn");
  if (!introContent || !toggleBtn) {
    return;
  }

  toggleBtn.addEventListener("click", () => {
    const isCollapsed = introContent.classList.contains("intro-collapsed");
    introContent.classList.toggle("intro-collapsed", !isCollapsed);
    toggleBtn.textContent = isCollapsed ? "Ler menos" : "Ler mais";
    toggleBtn.setAttribute("aria-expanded", String(isCollapsed));
  });
}

renderGifts();
setupClearButton();
setupLunchInfoLink();
setupIntroToggle();
setupImageModal();
