document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
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

  // --- Pre-loader Logic ---
  window.addEventListener("load", () => {
    const cubeContainer = document.querySelector("#loader .cube-container");

    // Move cube from loader to hero section
    if (cubeContainer && heroSwiperEl) {
      heroSwiperEl.prepend(cubeContainer);
    }

    // Hide the loader
    loader.classList.add("hidden");
    // Remove loader from DOM after transition
    setTimeout(() => {
      if (loader) loader.style.display = "none";
    }, 600); // Match CSS transition duration
  });

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
    const typewriterElement = activeSlide.querySelector(".hero-content .typewriter");
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

  const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      init: animateActiveSlide,
      slideChangeTransitionStart: animateActiveSlide,
    },
  });

  const pastorSwiper = new Swiper(".pastorSwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
  });

  const socialSwiper = new Swiper(".socialSwiper", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
  });

  // --- GSAP Animations ---
  gsap.from(".fade-in", { duration: 1, opacity: 0, y: 20, delay: 0.5 });
});
