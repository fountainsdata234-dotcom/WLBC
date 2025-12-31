// --- DATABASE ---
const sermonDB = [
  {
    title: "THE APOSTOLIC UNCTION",
    tags: "rev erochukwu fire power unction spirit",
    url: "https://www.youtube.com/embed/aiHgi71pBbE", // YouTube Link
  },
  {
    title: "MYSTERY OF GRACE",
    tags: "favor mercy kindness christ grace",
    url: "video/VID-20251003-WA0016.mp4", // Local Video
  },
  {
    title: "KINGDOM DOMINION",
    tags: "victory strength king war expansion",
    url: "video/VID-20251003-WA0017.mp4", // Local Video
  },
  {
    title: "THE COVENANT WEALTH",
    tags: "money blessing finances wealth covenant",
    url: "https://www.youtube.com/embed/another_id", // YouTube Link
  },
];

const fuse = new Fuse(sermonDB, { keys: ["title", "tags"], threshold: 0.4 });
const searchInput = document.getElementById("neuralSearch");
const drawer = document.getElementById("videoDrawer");
const drawerResults = document.getElementById("drawerResults");
const videoPlayer = document.getElementById("mainVideoPlayer");
const backdrop = document.getElementById("tvBackdrop");

// Search Drawer Logic
searchInput.addEventListener("click", () => {
  drawer.style.height = window.innerWidth < 600 ? "60vh" : "480px";
  updateList("");
});

document.getElementById("closeDrawerBtn").onclick = () =>
  (drawer.style.height = "0");
searchInput.oninput = (e) => updateList(e.target.value);

function updateList(val) {
  const results = val === "" ? sermonDB : fuse.search(val).map((r) => r.item);
  drawerResults.innerHTML = results
    .map(
      (s) => `
        <div class="v-item" onclick="launchMedia('${s.url}')">
            <div style="color:cyan; font-size:13px">${s.title}</div>
            <div style="color:#666; font-size:9px; margin-top:5px">SYSTEM SYNC: OPTIMAL</div>
        </div>
    `
    )
    .join("");
}

// --- 1. THE FORCED TILT TOGGLE ---
document.getElementById("cinemaMode").addEventListener("click", function () {
  const tvFrame = document.querySelector(".tv-frame");
  const isTilted = tvFrame.classList.contains("cinema-tilt");

  if (!isTilted) {
    // TRIGGER TILT
    tvFrame.classList.add("cinema-tilt");
    this.innerText = "EXIT LANDSCAPE";
    // Lock background scroll
    document.body.style.overflow = "hidden";
  } else {
    // REMOVE TILT
    tvFrame.classList.remove("cinema-tilt");
    this.innerText = "GO LANDSCAPE";
    document.body.style.overflow = "";
  }
});

// --- 2. UPDATED LAUNCHMEDIA FUNCTION ---
function launchMedia(url) {
  const videoPlayer = document.getElementById("mainVideoPlayer");
  const backdrop = document.getElementById("tvBackdrop");
  const cinemaBtn = document.getElementById("cinemaMode");

  // Show the button
  cinemaBtn.style.display = "block";
  cinemaBtn.innerText = "GO LANDSCAPE";

  backdrop.style.opacity = "0";

  // Check URL Type (YouTube vs Local)
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    videoPlayer.innerHTML = `
      <iframe width="100%" height="100%" 
        src="${url}?autoplay=1&rel=0&modestbranding=1" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>`;
  } else {
    videoPlayer.innerHTML = `
      <video width="100%" height="100%" controls autoplay style="object-fit: cover;">
        <source src="${url}" type="video/mp4">
      </video>`;
  }

  // Close the drawer
  document.getElementById("videoDrawer").style.height = "0";
}

// --- 3. THE RESET (LOCK BUTTON) ---
// Inside your existing navSecure button logic, add these resets:
document.getElementById("navSecure").addEventListener("click", () => {
  // 1. Hide Button
  document.getElementById("cinemaMode").style.display = "none";
  // 2. Kill Video
  document.getElementById("mainVideoPlayer").innerHTML = "";
  // 3. Remove Tilt if it was active
  document.querySelector(".tv-frame").classList.remove("cinema-tilt");
  document.body.style.overflow = "";

  // ... your other door closing code ...
}); // --- DOOR LOGIC ---
const orb = document.getElementById("orbTrigger");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playFX(type) {
  if (audioCtx.state === "suspended") audioCtx.resume();
  const g = audioCtx.createGain();
  g.connect(audioCtx.destination);
  const o = audioCtx.createOscillator();
  if (type === "open") {
    o.type = "sawtooth";
    o.frequency.setValueAtTime(60, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
  } else {
    o.type = "square";
    o.frequency.value = 80;
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  }
  o.connect(g);
  o.start();
  o.stop(audioCtx.currentTime + 0.8);
}

orb.onclick = () => {
  playFX("open");
  // SHOW THE SCROLLABLE WRAPPER
  document.getElementById("innerSanctuary").style.display = "block";

  gsap.set(".wiring", { strokeDashoffset: 200 });
  gsap.to(".wiring", {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.inOut",
  });

  const tl = gsap.timeline();
  tl.to(".orb-glass", { scale: 1.5, opacity: 0, duration: 0.6 })
    .to(".vent", { height: "40dvh", opacity: 0.5, duration: 0.3 })
    .to(".vent", { height: 0, opacity: 0, duration: 1 })
    .to(
      ".panel-left",
      { xPercent: -105, duration: 2, ease: "power4.inOut" },
      "-=1"
    )
    .to(
      ".panel-right",
      { xPercent: 105, duration: 2, ease: "power4.inOut" },
      "-=2"
    )
    .to(".main-content-revealed", { opacity: 1, duration: 1 }, "-=1")
    .set("#doorSystem", { display: "none" });
};

// --- LOCK LOGIC ---
document.getElementById("navSecure").onclick = () => {
  videoPlayer.innerHTML = "";
  backdrop.style.opacity = "0.1";
  drawer.style.height = "0";
  searchInput.value = "";
  document.getElementById("innerSanctuary").style.display = "none";

  gsap.set("#doorSystem", { display: "flex" });
  gsap.to(".orb-glass", { scale: 1, opacity: 1, duration: 0.5 });
  gsap.to(".panel-left", { xPercent: 0, duration: 1.5 });
  gsap.to(".panel-right", { xPercent: 0, duration: 1.5 });
  gsap.set(".wiring", { strokeDashoffset: 200 });
};
// clock
// --- 1. CLOCK LOGIC ---
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("digital-time").innerText = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);

// --- 2. SPEECH & INTERACTION LOGIC ---
const clockTrigger = document.getElementById("clockTrigger");
const announcement = document.getElementById("liveAnnouncement");
const messageText = document.getElementById("announcement-text").innerText;

clockTrigger.addEventListener("click", () => {
  // Show the container
  announcement.classList.add("show");

  // SYSTEM INBUILT SPEECH (The Clock reads the message)
  if ("speechSynthesis" in window) {
    // Cancel any currently speaking text
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(messageText);
    speech.pitch = 0.8; // Low mechanical voice
    speech.rate = 1.0;
    speech.volume = 1.0;
    window.speechSynthesis.speak(speech);
  }
});

// Close functionality
document.querySelector(".close-announcement").onclick = (e) => {
  e.stopPropagation();
  announcement.classList.remove("show");
  window.speechSynthesis.cancel();
};

// --- 3. LINKING THE LIVE SERVICE ---
// How to link your service to the existing video frame:
function launchLiveService() {
  const videoContainer = document.getElementById("mainVideoPlayer"); // This is your video frame ID
  const backdrop = document.getElementById("tvBackdrop");

  // THE YOUTUBE LIVE LINK (or your specific live URL)
  const liveUrl =
    "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID";

  // 1. Hide the church logo backdrop
  if (backdrop) backdrop.style.opacity = "0";

  // 2. Inject the Live Feed into your TV
  videoContainer.innerHTML = `
        <iframe width="100%" height="100%" 
            src="${liveUrl}&autoplay=1" 
            frameborder="0" allow="autoplay; encrypted-media" 
            allowfullscreen>
        </iframe>`;

  // 3. Close the announcement
  announcement.classList.remove("show");

  // 4. Scroll the user to the TV section automatically
  document
    .getElementById("innerSanctuary")
    .scrollIntoView({ behavior: "smooth" });
}

//audio disc
const audioCards = document.querySelectorAll(".audio-card");
let activeAudio = null;
let activeCard = null;

audioCards.forEach((card) => {
  const playBtn = card.querySelector(".play-trigger");
  const audioSrc = card.getAttribute("data-audio-src");
  const scrubber = card.querySelector(".audio-scrubber");

  const audio = new Audio(audioSrc);

  // 1. Set the max value of scrubber when metadata (duration) loads
  audio.addEventListener("loadedmetadata", () => {
    scrubber.max = audio.duration;
  });

  // 2. Update scrubber position and color fill as audio plays
  audio.addEventListener("timeupdate", () => {
    if (!audio.paused) {
      scrubber.value = audio.currentTime;
      const prog = (audio.currentTime / audio.duration) * 100;
      scrubber.style.setProperty("--p", prog + "%");
    }
  });

  // 3. Manual Scrubbing: Allow user to drag the bar to seek
  scrubber.addEventListener("input", () => {
    audio.currentTime = scrubber.value;
    const prog = (scrubber.value / audio.duration) * 100;
    scrubber.style.setProperty("--p", prog + "%");
  });

  // 4. Play/Pause Logic
  playBtn.addEventListener("click", () => {
    // If another audio is already playing, stop it and reset its UI
    if (activeAudio && activeAudio !== audio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeCard.classList.remove("playing");
      activeCard.querySelector(".play-trigger").innerText = "PLAY MESSAGE";

      // Reset the old scrubber visually
      const oldScrubber = activeCard.querySelector(".audio-scrubber");
      oldScrubber.value = 0;
      oldScrubber.style.setProperty("--p", "0%");
    }

    if (audio.paused) {
      audio.play();
      card.classList.add("playing");
      playBtn.innerText = "PAUSE";
      activeAudio = audio;
      activeCard = card;
    } else {
      audio.pause();
      card.classList.remove("playing");
      playBtn.innerText = "PLAY MESSAGE";
    }
  });

  // 5. Auto-reset when the sermon ends
  audio.addEventListener("ended", () => {
    card.classList.remove("playing");
    playBtn.innerText = "PLAY MESSAGE";
    scrubber.value = 0;
    scrubber.style.setProperty("--p", "0%");
  });
});

// BOOK
const bookData = [
  {
    title: "The Power of Faith",
    summary:
      "Explore the depths of unwavering faith. In this book, Rev. S.G. Erochukwu breaks down how faith acts as a currency in the spiritual realm to possess the physical.",
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Walking in Grace",
    summary:
      "Grace is not just unmerited favor; it is a spiritual enablement. Discover how to walk in the overflow of God's grace every day of your life.",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Kingdom Dominion",
    summary:
      "You were created to rule. This manuscript details the protocols of exercising your authority as a believer in every sphere of influence.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Secret Altar",
    summary:
      "The strength of your public life is determined by your private altar. Learn the ancient patterns of effective prayer and communion with the Father.",
    img: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80",
  },
];

function openBook(index) {
  const book = bookData[index];
  document.getElementById("modalTitle").innerText = book.title;
  document.getElementById("modalSummary").innerText = book.summary;
  document.getElementById("modalImg").src = book.img;
  document.getElementById("bookModal").style.display = "flex";
}

function closeBook() {
  document.getElementById("bookModal").style.display = "none";
}

// Close on outside click
window.onclick = function (event) {
  let modal = document.getElementById("bookModal");
  if (event.target == modal) {
    closeBook();
  }
};
// 1. REVEAL LOGIC (Intersection Observer)
const footer = document.getElementById("holyFooter");
const sensor = document.getElementById("footer-sensor");

if (footer && sensor) {
  const footerObserver = new IntersectionObserver(
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

  footerObserver.observe(sensor);
}

// 2. CAROUSEL LOGIC
const wordCards = document.querySelectorAll(".word-card");
let currentWord = 0;

function rotateWords() {
  wordCards[currentWord].classList.remove("active");
  currentWord = (currentWord + 1) % wordCards.length;
  wordCards[currentWord].classList.add("active");
}

setInterval(rotateWords, 4000);
