document.addEventListener("DOMContentLoaded", () => {
  const layer = document.getElementById("balloonLayer");
  const h1 = document.querySelector(".yes-wrap h1");
  const audio = document.getElementById("yesAudio");

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
    const duration = 7 + Math.random() * 3;
    
    petal.className = "rose-petal";
    petal.style.left = `${left}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    
    layer.appendChild(petal);
    
    petal.addEventListener("animationend", () => {
      petal.remove();
    });
  };

  // Start rose petal spawning
  setInterval(spawnRosePetal, 500);
  initTypewriter();

  const tryPlayAudio = () => {
    if (!audio) {
      return;
    }
    audio.play().catch(() => {});
  };

  tryPlayAudio();
  window.addEventListener("click", tryPlayAudio, { once: true });
  window.addEventListener("keydown", tryPlayAudio, { once: true });

  const createConfetti = () => {
    const count = 80 + Math.random() * 40;
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      const size = 5 + Math.random() * 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.3;
      const duration = 3 + Math.random() * 1.5;
      const drift = (Math.random() - 0.5) * 250;
      const colors = ["#ff2d55", "#ff8fb1", "#fff", "#ffc0cb", "#ff69b4"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.position = "fixed";
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}vw`;
      confetti.style.bottom = "-10px";
      confetti.style.background = color;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "1";
      confetti.style.setProperty("--drift", `${drift}px`);
      confetti.style.animation = `confetti-fall ${duration}s ease-out ${delay}s forwards`;

      layer.appendChild(confetti);
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  };

  createConfetti();

  const spawnMiniHearts = (x, y) => {
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i += 1) {
      const mini = document.createElement("div");
      const size = 8 + Math.random() * 8;
      mini.className = "mini-heart";
      mini.style.width = `${size}px`;
      mini.style.height = `${size}px`;
      mini.style.left = `${x}px`;
      mini.style.top = `${y}px`;
      mini.style.setProperty("--mini-x", `${Math.random() * 60 - 30}px`);
      mini.style.setProperty("--mini-y", `${-20 - Math.random() * 50}px`);
      layer.appendChild(mini);

      mini.addEventListener("animationend", () => {
        mini.remove();
      });
    }
  };

  const spawnBalloonHeart = () => {
    const heart = document.createElement("div");
    const size = 24 + Math.random() * 24;
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 4;
    const isWhite = Math.random() < 0.35;

    heart.className = isWhite ? "balloon-heart balloon-heart--white" : "balloon-heart";
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;

    layer.appendChild(heart);

    const popDelay = 2000 + Math.random() * 2500;
    setTimeout(() => {
      if (!heart.isConnected) {
        return;
      }

      const rect = heart.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      spawnMiniHearts(centerX, centerY);
      heart.remove();
    }, popDelay);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  };

  setInterval(spawnBalloonHeart, 250);

  const polaroids = document.querySelectorAll(".polaroid");
  const secretButton = document.getElementById("secretButton");
  const passwordPopup = document.getElementById("passwordPopup");
  const passwordInput = document.getElementById("passwordInput");
  const submitPassword = document.getElementById("submitPassword");
  const passwordError = document.getElementById("passwordError");
  const scrollPoem = document.getElementById("scrollPoem");
  const scrollOverlay = document.getElementById("scrollOverlay");

  const requiredFlipOrder = [4, 2, 3, 1, 5];
  let flipIndex = 0;

  const getPolaroidNumber = (polaroid) => {
    const img = polaroid.querySelector("img");
    if (!img) {
      return null;
    }

    const match = img.getAttribute("src").match(/(\d+)\.[a-zA-Z]+$/);
    return match ? Number(match[1]) : null;
  };

  const resetFlipSequence = () => {
    flipIndex = 0;
    secretButton.classList.add("hidden");
  };

  polaroids.forEach((polaroid) => {
    polaroid.style.cursor = "pointer";

    polaroid.addEventListener("click", (event) => {
      event.stopPropagation();

      const isFlipped = polaroid.classList.contains("flipped");
      const polaroidNumber = getPolaroidNumber(polaroid);

      if (!polaroidNumber) {
        resetFlipSequence();
        return;
      }

      if (isFlipped) {
        polaroid.classList.remove("flipped");
        resetFlipSequence();
        return;
      }

      polaroid.classList.add("flipped");

      if (polaroidNumber === requiredFlipOrder[flipIndex]) {
        flipIndex += 1;
      } else {
        resetFlipSequence();
      }

      if (flipIndex === requiredFlipOrder.length) {
        setTimeout(() => {
          secretButton.classList.remove("hidden");
        }, 400);
      } else {
        secretButton.classList.add("hidden");
      }
    });
  });

  // Secret button click handler
  secretButton.addEventListener("click", () => {
    passwordPopup.classList.remove("hidden");
    passwordInput.focus();
  });

  // Password submission
  const checkPassword = () => {
    const password = passwordInput.value.trim();

    if (password.toLowerCase() === "brown eyes") {
      passwordPopup.classList.add("hidden");
      passwordInput.value = "";
      passwordError.classList.add("hidden");

      // Show the scroll poem
      setTimeout(() => {
        scrollPoem.classList.remove("hidden");
      }, 300);
    } else {
      passwordError.classList.remove("hidden");
      passwordInput.value = "";

      // Shake animation
      passwordPopup.querySelector(".password-popup-content").style.animation = "shake 0.5s";
      setTimeout(() => {
        passwordPopup.querySelector(".password-popup-content").style.animation = "";
      }, 500);
    }
  };

  submitPassword.addEventListener("click", checkPassword);

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkPassword();
    }
  });

  // Close scroll when clicking overlay
  scrollOverlay.addEventListener("click", () => {
    scrollPoem.classList.add("hidden");
  });

  // Close scroll when clicking close button
  const closePoem = document.getElementById("closePoem");
  if (closePoem) {
    closePoem.addEventListener("click", () => {
      scrollPoem.classList.add("hidden");
    });
  }
});