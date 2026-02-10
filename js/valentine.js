document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const zone = document.querySelector(".button-zone");
  const modal = document.getElementById("noModal");
  const modalMessage = document.getElementById("modalMessage");
  const modalOkBtn = document.getElementById("modalOkBtn");
  const audio = document.getElementById("valentineAudio");
  const h1 = document.querySelector(".valentine-wrap h1");

  // Typewriter effect
  const initTypewriter = () => {
    if (h1) {
      const text = h1.textContent;
      h1.textContent = text;
      h1.style.setProperty("--chars", text.length);
      h1.classList.add("typewriter");
    }
  };

  // Spawn rose petals
  const spawnRosePetal = () => {
    const petal = document.createElement("div");
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = 5 + Math.random() * 3;
    
    petal.className = "rose-petal";
    petal.style.left = `${left}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    
    document.body.appendChild(petal);
    
    petal.addEventListener("animationend", () => {
      petal.remove();
    });
  };

  // Start rose petal spawning
  setInterval(spawnRosePetal, 600);

  let noClicks = 0;
  let noDisabled = false;
  let lastHeartTime = 0;
  let noPos = { x: 0, y: 0 };

  const getZoneMetrics = () => {
    const zoneRect = zone.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 18;
    return {
      zoneRect,
      btnWidth: btnRect.width,
      btnHeight: btnRect.height,
      padding,
    };
  };

  const tryPlayAudio = () => {
    audio.play().catch(() => {});
  };

  tryPlayAudio();
  window.addEventListener("click", tryPlayAudio, { once: true });
  window.addEventListener("keydown", tryPlayAudio, { once: true });

  initTypewriter();

  const placeNoButtonAt = (x, y) => {
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const minX = padding;
    const maxX = viewportWidth - btnRect.width - padding;
    const minY = padding;
    const maxY = viewportHeight - btnRect.height - padding;
    const clampedX = Math.max(minX, Math.min(maxX, x));
    const clampedY = Math.max(minY, Math.min(maxY, y));

    noPos = { x: clampedX, y: clampedY };
    noBtn.style.position = "fixed";
    noBtn.style.left = `${clampedX}px`;
    noBtn.style.top = `${clampedY}px`;
    noBtn.style.transform = "none";
  };

  const showModal = (message) => {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  const hideModal = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  };

  const spawnFloatingHeart = () => {
    const heart = document.createElement("div");
    const left = Math.random() * 100;
    heart.className = "floating-heart";
    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${5 + Math.random() * 3}s`;
    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  };

  setInterval(spawnFloatingHeart, 800);

  const createConfetti = () => {
    const count = 50 + Math.random() * 30;
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      const size = 4 + Math.random() * 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.2;
      const duration = 2.5 + Math.random() * 1;
      const drift = (Math.random() - 0.5) * 200;
      const colors = ["#ff3d6b", "#ff8fb1", "#fff", "#ffc0cb"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.position = "fixed";
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}vw`;
      confetti.style.bottom = "-10px";
      confetti.style.background = color;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "4";
      confetti.style.setProperty("--drift", `${drift}px`);
      confetti.style.animation = `confetti-fall ${duration}s ease-out ${delay}s forwards`;

      document.body.appendChild(confetti);
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  };

  yesBtn.addEventListener("click", () => {
    createConfetti();
    setTimeout(() => {
      window.location.href = "yes.html";
    }, 300);
  });

  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    noClicks += 1;

    if (noClicks === 1) {
      showModal("HEY NOW, I THOUGHT YOU LOVED ME :( let's try that again");
      return;
    }

    showModal("Okay that's just mean, I'm taking that option away now :(");
    modalOkBtn.textContent = "Fine, I'll really say yes now";
    noDisabled = true;
    noBtn.style.display = "none";
    yesBtn.style.left = "50%";
    yesBtn.style.transform = "translate(-50%, -50%) scale(1.6)";
    yesBtn.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
  });

  modalOkBtn.addEventListener("click", hideModal);

  const nudgeNoButton = (mouseX, mouseY) => {
    if (noDisabled) {
      return;
    }

    const dx = noPos.x - mouseX;
    const dy = noPos.y - mouseY;
    const distance = Math.hypot(dx, dy);
    const safeRadius = 120;

    if (distance >= safeRadius) {
      return;
    }

    const pushStrength = (safeRadius - distance) / safeRadius;
    const maxStep = 42;
    const step = Math.max(8, maxStep * pushStrength);
    const normX = dx === 0 && dy === 0 ? 1 : dx / distance;
    const normY = dx === 0 && dy === 0 ? 0 : dy / distance;

    placeNoButtonAt(noPos.x + normX * step, noPos.y + normY * step);
  };

  document.addEventListener("mousemove", (event) => {
    const now = Date.now();

    if (now - lastHeartTime > 35) {
      lastHeartTime = now;
      spawnHeart(event.clientX, event.clientY, Math.random() < 0.3);
      if (Math.random() < 0.2) {
        spawnHeart(event.clientX + 10, event.clientY - 12, true);
      }
    }
  });

  let lastNudgeTime = 0;
  document.addEventListener("mousemove", (event) => {
    const now = Date.now();
    if (now - lastNudgeTime < 90) {
      return;
    }

    lastNudgeTime = now;
    nudgeNoButton(event.clientX, event.clientY);
  });

  document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }
    nudgeNoButton(touch.clientX, touch.clientY);
  }, { passive: true });

  const spawnHeart = (x, y, isWhite) => {
    const heart = document.createElement("span");
    const size = 8 + Math.random() * 8;
    heart.className = isWhite ? "cursor-heart cursor-heart--white" : "cursor-heart";
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  };

  const setInitialNoPosition = () => {
    const zoneRect = zone.getBoundingClientRect();
    noPos = { 
      x: zoneRect.left + zoneRect.width * 0.7, 
      y: zoneRect.top + zoneRect.height * 0.5 
    };
  };

  setInitialNoPosition();
  window.addEventListener("resize", setInitialNoPosition);
});
