const appData = [
  {
    name: "Animal Sounds",
    category: "Featured",
    bundleId: "com.smartbabyapps.animalsounds",
    version: "2.0",
    minimumIOS: "3.1",
    download: "#"
  },
  {
    name: "SoundTouch",
    category: "Audio",
    bundleId: "com.yourcompany.SoundTouch",
    version: "1.4",
    minimumIOS: "3.0",
    download: "#"
  },
  {
    name: "Tozzle",
    category: "Game",
    bundleId: "com.nodeflexion.Tozzle",
    version: "3.7",
    minimumIOS: "3.1.3",
    download: "#"
  },
  {
    name: "AutismXpress",
    category: "Education",
    bundleId: "X7WS995LSR.com.StudioEmotion.AutismXpress",
    version: "1.0",
    minimumIOS: "3.1.2",
    download: "#"
  },
  {
    name: "Lunchbox",
    category: "Kids",
    bundleId: "com.thup.MonkeyPreschool",
    version: "1.4",
    minimumIOS: "3.0",
    download: "#"
  },
  {
    name: "Peek-a-Zoo",
    category: "Education",
    bundleId: "com.duckduckmoosedesign.peekazoo",
    version: "1.1.1",
    minimumIOS: "3.0",
    download: "#"
  },
  {
    name: "Michigan Nature Sounds",
    category: "Audio",
    bundleId: "com.yourcompany.MichiganNatureSounds",
    version: "1.0",
    minimumIOS: "3.0",
    download: "#"
  },
  {
    name: "Artsee",
    category: "Art",
    bundleId: "com.britejar.artsee",
    version: "1.1",
    minimumIOS: "2.2",
    download: "#"
  },
  {
    name: "Angry Birds",
    category: "Game",
    bundleId: "com.rovio.AngryBirdsHalloween",
    version: "1.5.3",
    minimumIOS: "3.0",
    download: "#"
  },
  {
    name: "Farm Flip Fun",
    category: "Game",
    bundleId: "lv.yapp.farmflipfun",
    version: "1.0",
    minimumIOS: "3.0",
    download: "#"
  }
];

const featuredApps = appData.slice(0, 3);
const featuredEl = document.getElementById("featuredApps");
const allAppsEl = document.getElementById("allApps");
const template = document.getElementById("appCardTemplate");
const appCount = document.getElementById("appCount");

appCount.textContent = String(appData.length);

function renderFeatured() {
  featuredApps.forEach((app) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".app-name").textContent = app.name;
    clone.querySelector(".app-category").textContent = app.category;
    clone.querySelector(".bundle-id").textContent = app.bundleId;
    clone.querySelector(".version").textContent = app.version;
    clone.querySelector(".minimum-ios").textContent = app.minimumIOS;

    const button = clone.querySelector(".download-button");
    button.addEventListener("click", () => {
      window.location.href = app.download;
    });

    featuredEl.appendChild(clone);
  });
}

function renderAllApps() {
  appData.forEach((app) => {
    const row = document.createElement("div");
    row.className = "archive-item";
    row.innerHTML = `
      <strong>${app.name}</strong>
      <span>${app.bundleId}</span>
      <small>v${app.version}</small>
      <small>iOS ${app.minimumIOS}+</small>
      <button class="download-button list-action" type="button">Download</button>
    `;

    const button = row.querySelector("button");
    button.addEventListener("click", () => {
      window.location.href = app.download;
    });

    allAppsEl.appendChild(row);
  });
}

renderFeatured();
renderAllApps();

const installButton = document.getElementById("installButton");
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Ignore registration errors in unsupported environments.
    });
  });
}

installButton.hidden = true;
