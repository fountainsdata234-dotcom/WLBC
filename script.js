document.addEventListener("DOMContentLoaded", () => {
  const heroSwiperEl = document.querySelector(".heroSwiper");
  const mainNav = document.getElementById("main-nav");
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const themeToggleDesktop = document.getElementById("theme-toggle-desktop");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const dropdown = document.querySelector(".dropdown");
  const dropBtn = document.querySelector(".dropdown .dropbtn");
  const cube = document.querySelector(".cube");
  const backToTopBtn = document.getElementById("back-to-top");

  // --- Initialize Lucide Icons ---
  lucide.createIcons();

  // --- Smart Navbar on Scroll ---
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Show/hide navbar on scroll
    if (scrollTop > lastScrollTop) {
      // Downscroll - Hide navbar
      mainNav.style.top = "0";
    } else {
      // Upscroll - Show navbar
      mainNav.style.top = `-${mainNav.offsetHeight}px`;
    }
    if (scrollTop <= mainNav.offsetHeight) {
      mainNav.style.top = "0"; // Always show at top
    }

    // Show/hide back-to-top button
    if (scrollTop > 300) backToTopBtn.classList.add("show");
    else backToTopBtn.classList.remove("show");

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // --- Hamburger Menu Toggle ---
  burger.addEventListener("click", () => {
    // Toggle Nav
    navLinks.classList.toggle("nav-active");

    // Burger Animation
    burger.classList.toggle("toggle");

    // Prevent body scroll when menu is open
    document.body.classList.toggle("no-scroll");
  });

  // --- Mobile Dropdown Toggle ---
  dropBtn.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Prevent link navigation only on mobile
      dropdown.classList.toggle("open");
    }
  });

  // --- Theme Toggler ---
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  themeToggleDesktop.addEventListener("click", toggleTheme);
  themeToggleMobile.addEventListener("click", toggleTheme);

  // --- Back to Top Button Click ---
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Chatbot Toggle ---
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeChatbot = document.getElementById("close-chatbot");

  if (chatbotToggle && chatbotContainer && closeChatbot) {
    chatbotToggle.addEventListener("click", () => {
      chatbotContainer.classList.toggle("show");
      lucide.createIcons(); // Re-render close icon if needed
    });

    closeChatbot.addEventListener("click", () => {
      chatbotContainer.classList.remove("show");
    });
  }
  // --- Hero Section Typewriter Effect (No Sound) ---
  let heroTypewriterTimeout;
  function heroTypewriter(element) {
    clearTimeout(heroTypewriterTimeout); // Clear previous animation
    const text = element.getAttribute("data-text");
    element.innerHTML = ""; // Clear existing text
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        heroTypewriterTimeout = setTimeout(type, 100); // Typing speed
      }
    }
    type();
  }

  // Function to animate the active hero slide's title
  function animateActiveSlide(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const typewriterElement = activeSlide.querySelector(
      ".hero-content .typewriter"
    );
    if (typewriterElement) {
      // Reset other slides
      swiper.slides.forEach((slide) => {
        const el = slide.querySelector(".hero-content .typewriter");
        if (el && el !== typewriterElement) el.innerHTML = "";
      });
      heroTypewriter(typewriterElement);
    }
  }

  // --- 3D Cube Interaction ---
  if (cube) {
    let rotateX = 0;
    let rotateY = 0;

    // Automatic rotation
    function autoRotate() {
      rotateY += 0.2; // Adjust speed of auto-rotation
      // rotateX += 0.1; // Keeping rotation on one axis for the loader looks cleaner
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      requestAnimationFrame(autoRotate);
    }
    autoRotate();

    // Re-enabled mouse/touch interaction
    let sensitivity = 10; // Adjust sensitivity here
    let lastMouseX = 0,
      lastMouseY = 0;

    function handleMove(x, y) {
      const dx = x - lastMouseX;
      const dy = y - lastMouseY;

      rotateY += dx * sensitivity;
      rotateX -= dy * sensitivity;

      lastMouseX = x;
      lastMouseY = y;
    }

    // Mouse interaction for desktop
    document
      .querySelector(".hero-section")
      .addEventListener("mousemove", (e) => {
        handleMove(e.clientX, e.clientY);
      });

    // Touch interaction for mobile
    document
      .querySelector(".hero-section")
      .addEventListener("touchmove", (e) => {
        if (e.touches.length === 1)
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
      });
  }
  // --- Swiper Initializations ---

  if (document.querySelector(".heroSwiper")) {
    const heroSwiper = new Swiper(".heroSwiper", {
      loop: false,
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: animateActiveSlide,
        slideChangeTransitionStart: animateActiveSlide,
      },
    });
  }

  if (document.querySelector(".pastorSwiper")) {
    const pastorSwiper = new Swiper(".pastorSwiper", {
      effect: "cards",
      grabCursor: true,
      loop: true,
    });
  }

  if (document.querySelector(".socialSwiper")) {
    const socialSwiper = new Swiper(".socialSwiper", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
    });
  }

  // --- GSAP Animations ---
  gsap.from(".fade-in", { duration: 1, opacity: 0, y: 20, delay: 0.5 });
});
// Audio Context Setup for "Tick" Sound
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

function playTick() {
  if (audioCtx.state === "suspended") audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine"; // Soft tick
  oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
}

// Typewriter Logic
const typewriterElements = document.querySelectorAll(
  ".church-slider-wrap .typewriter"
);

typewriterElements.forEach((el) => {
  const fullText = el.getAttribute("data-text");
  let isDeleting = false;
  let textIdx = 0;
  let isVisible = false;

  // Observer to check if card is in view
  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
    },
    { threshold: 0.5 }
  );

  observer.observe(el);

  function type() {
    const currentText = isDeleting
      ? fullText.substring(0, textIdx--)
      : fullText.substring(0, textIdx++);

    el.innerText = currentText;

    // Play sound only if visible and typing
    if (isVisible && !isDeleting && textIdx < fullText.length) {
      playTick();
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && textIdx === fullText.length + 1) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && textIdx === 0) {
      isDeleting = false;
      typeSpeed = 500; // Pause before restarting
    }

    setTimeout(type, typeSpeed);
  }

  type();
});

// Scroll Indicator Logic
const slider = document.getElementById("churchSlider");
const scrollLine = document.getElementById("scrollLine");

slider.addEventListener("scroll", () => {
  const scrollPercentage =
    (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
  scrollLine.style.left = scrollPercentage * 0.7 + "%";
});

// Drag to scroll for Church Slider
if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active-drag");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active-drag");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active-drag");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // The multiplier '2' makes it scroll faster
    slider.scrollLeft = scrollLeft - walk;
  });
}

// Pause sound when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) audioCtx.suspend();
});
// Shadow on Scroll Animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        // Optional: Remove if you want the shadow to disappear when scrolling away
        // entry.target.classList.remove('active');
      }
    });
  },
  { threshold: 0.2 }
); // Triggers when 20% of the section is visible

document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  revealObserver.observe(el);
});

// cards swipe
let cards = Array.from(document.querySelectorAll(".divine-card"));
const shuffleBtn = document.getElementById("shuffleTrigger");
const currIdxEl = document.getElementById("currIdx");
const totalIdxEl = document.getElementById("totalIdx");
let currentIndex = 1;
let isAnimating = false;

totalIdxEl.innerText = cards.length;

function arrangeDeck() {
  cards.forEach((card, i) => {
    // The card at index 0 is the FRONT card
    card.style.zIndex = cards.length - i;

    if (i === 0) {
      // Top Card: Perfectly straight and bright
      card.style.transform = `translateY(0) rotate(0deg) scale(1)`;
      card.style.opacity = "1";
      card.style.filter = "blur(0px)";
      startSilentTypewriter(card); // Start typing animation
    } else {
      // Background Cards: Staggered rotation like your image
      // We use (i * 3) to make them peek out more
      const rotateDir = i % 2 === 0 ? 1 : -1; // Alternate left/right tilt
      const rotation = i * 4 * rotateDir;
      const yOffset = i * 8; // Moves them slightly down
      const scale = 1 - i * 0.03; // Slightly smaller for depth

      card.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`;

      // "Holy" Effect: Background cards are slightly faded
      card.style.opacity = i > 3 ? "0" : "0.7";
      card.style.filter = `blur(${i * 1}px)`; // Cards further back are blurrier
    }
  });
}

function doShuffle() {
  if (isAnimating) return;
  isAnimating = true;

  const topCard = cards[0];
  topCard.classList.add("shuffle-out");

  setTimeout(() => {
    topCard.classList.remove("shuffle-out");
    // Move top card to bottom of array
    const movedCard = cards.shift();
    cards.push(movedCard);

    currentIndex = currentIndex >= cards.length ? 1 : currentIndex + 1;
    currIdxEl.innerText = currentIndex;

    arrangeDeck();
    isAnimating = false;
  }, 700);
}

function startSilentTypewriter(card) {
  const p = card.querySelector(".silent-typewriter");
  const text = p.getAttribute("data-text");
  p.innerText = "";
  let j = 0;

  function type() {
    if (j < text.length) {
      p.innerText += text.charAt(j);
      j++;
      setTimeout(type, 30);
    }
  }
  type();
}

// Click & Touch
shuffleBtn.addEventListener("click", doShuffle);

let touchStart = 0;
document
  .getElementById("testimonialDeck")
  .addEventListener("touchstart", (e) => (touchStart = e.touches[0].clientX));
document.getElementById("testimonialDeck").addEventListener("touchend", (e) => {
  if (Math.abs(touchStart - e.changedTouches[0].clientX) > 50) doShuffle();
});

// Init
arrangeDeck();

//open box
document.querySelectorAll(".step-header").forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.parentElement;
    const isOpen = currentItem.classList.contains("active");

    // Optional: Close all other open items first
    document.querySelectorAll(".step-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".step-icon").innerText = "+";
    });

    // Toggle current item
    if (!isOpen) {
      currentItem.classList.add("active");
      button.querySelector(".step-icon").innerText = "-";
    } else {
      currentItem.classList.remove("active");
      button.querySelector(".step-icon").innerText = "+";
    }
  });
});
// 1. REVEAL LOGIC (Intersection Observer)
const footer = document.getElementById("holyFooter");
const sensor = document.getElementById("footer-sensor");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When sensor is seen at the bottom, reveal the footer
        footer.classList.add("reveal");
      } else {
        // If you want it to hide again when scrolling up, keep this.
        // If you want it to stay revealed once found, comment this out:
        // footer.classList.remove('reveal');
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(sensor);

// 2. CAROUSEL LOGIC
const wordCards = document.querySelectorAll(".word-card");
let currentWord = 0;

function rotateWords() {
  wordCards[currentWord].classList.remove("active");
  currentWord = (currentWord + 1) % wordCards.length;
  wordCards[currentWord].classList.add("active");
}

setInterval(rotateWords, 4000);

// --- Ripple Effect for About Page Buttons ---
document.querySelectorAll(".glitch-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple element
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    // Position ripple
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Add and remove
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// --- ABOUT PAGE DOOR TRANSITION LOGIC ---
function openSection(sectionId) {
  const door = document.getElementById("transition-door");
  const intro = document.getElementById("intro-section");
  const targetSection = document.getElementById(sectionId);

  // 1. Close the door (Slide Down)
  door.classList.add("closed");

  // 2. Wait for door to close, then swap content
  setTimeout(() => {
    intro.style.display = "none";
    // Hide all sections first
    document
      .querySelectorAll(".content-section")
      .forEach((sec) => sec.classList.add("hidden-section"));
    // Show target
    targetSection.classList.remove("hidden-section");

    // 3. Open the door (Slide Up/Away)
    door.classList.remove("closed");
  }, 800); // Matches CSS transition time
}

function closeSection() {
  const door = document.getElementById("transition-door");
  const intro = document.getElementById("intro-section");

  // 1. Close door
  door.classList.add("closed");

  setTimeout(() => {
    // 2. Swap back to intro
    document
      .querySelectorAll(".content-section")
      .forEach((sec) => sec.classList.add("hidden-section"));
    intro.style.display = "flex"; // Intro uses flex

    // 3. Open door
    door.classList.remove("closed");
  }, 800);
}
