// --- DATABASE ---
const sermonDB = [
  {
    title: "THE APOSTOLIC UNCTION",
    tags: "rev erochukwu fire power unction spirit",
    url: "video/VID-20251003-WA0015.mp4",
  },
  {
    title: "MYSTERY OF GRACE",
    tags: "favor mercy kindness christ grace",
    url: "video/video2.mp4",
  },
  {
    title: "KINGDOM DOMINION",
    tags: "victory strength king war expansion",
    url: "video/video3.mp4",
  },
  {
    title: "THE COVENANT WEALTH",
    tags: "money blessing finances wealth covenant",
    url: "video/video4.mp4",
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

function launchMedia(url) {
  backdrop.style.opacity = "0";
  videoPlayer.innerHTML = `<video width="100%" height="100%" src="${url}" controls autoplay style="object-fit:cover;"></video>`;
  drawer.style.height = "0";
}

// --- DOOR LOGIC ---
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
