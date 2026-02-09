const CACHE_NAME = "health-tracker-silent-v1";
const FILES_TO_CACHE = ["index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener('install', evt => { evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))); });
self.addEventListener('fetch', evt => { evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request))); });
// === Advanced Health System ===
function calculateHealthScore(data) {
  let score = 0;
  if (data.steps >= 8000) score += 25;
  else if (data.steps >= 4000) score += 15;
  else score += 5;

  if (data.sleep >= 7) score += 25;
  else if (data.sleep >= 5) score += 15;
  else score += 5;

  if (data.water >= 6) score += 25;
  else if (data.water >= 4) score += 15;
  else score += 5;

  if (data.exercise >= 30) score += 25;
  else if (data.exercise >= 15) score += 15;
  else score += 5;

  return score;
}

function getBadge(score) {
  if (score >= 90) return "🏅 Gold Health Master";
  if (score >= 70) return "🥈 Silver Healthy Hero";
  if (score >= 50) return "🥉 Bronze Beginner";
  return "🌱 Getting Started";
}

function getDailyTip() {
  const tips = [
    "Take a 10-minute walk today.",
    "Drink an extra glass of water.",
    "Sleep earlier tonight.",
    "Eat one fruit or vegetable.",
    "Stretch your body for 5 minutes."
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

// Hook into existing app logic if available
window.addEventListener("load", () => {
  try {
    const data = window.latestHealthData || {steps: 0, sleep: 0, water: 0, exercise: 0};
    const score = calculateHealthScore(data);
    document.getElementById("healthScore").innerText = "Health Score: " + score + "/100";
    document.getElementById("badge").innerText = "Badge: " + getBadge(score);
    document.getElementById("dailyTip").innerText = getDailyTip();
  } catch (e) {}
});
