let lastAlarmTime = null;
let alarmTimeout = null;

const alarmMessages = [
  "🔥 Brand in Mehrfamilienhaus",
  "🚗 Verkehrsunfall mit mehreren Fahrzeugen",
  "🌪️ Sturmschaden – Baum auf Straße",
  "🏥 Tragehilfe für Rettungsdienst",
  "💧 Wasser im Keller – Technische Hilfe",
  "🔥 BMA ausgelöst – Industriehalle",
  "🚨 Person in Notlage – Türöffnung",
  "🔥 Zimmerbrand – Menschenleben in Gefahr",
  "🛢️ Ölspur auf Hauptstraße",
  "⚡ Stromausfall in Pflegeheim – Unterstützung nötig",
];

function startSimulation() {
  document.querySelector(".start-btn").disabled = true;
  logMessage("✅ Simulation gestartet.");
  scheduleNextAlarm();
}

function scheduleNextAlarm() {
  const delay = (Math.floor(Math.random() * 50) + 10) * 60 * 1000; // 10–60 Minuten
  alarmTimeout = setTimeout(triggerAlarm, delay);
}

function triggerAlarm() {
  const now = new Date();
  const elapsed = lastAlarmTime ? (now - lastAlarmTime) : Infinity;

  if (elapsed < 3600000) {
    showAlarm("🚫 Einsatz abgebrochen – Letzter Alarm < 1h alt", false);
    logMessage("🚫 Einsatz automatisch abgebrochen.");
  } else {
    const message = getRandomMessage();
    lastAlarmTime = now;
    showAlarm("🔊 ALARM: " + message, true);
    logMessage("🕒 " + now.toLocaleTimeString() + " – " + message);
  }

  scheduleNextAlarm();
}

function getRandomMessage() {
  return alarmMessages[Math.floor(Math.random() * alarmMessages.length)];
}

function showAlarm(text, playSound) {
  const alarmBox = document.getElementById("alarmBox");
  alarmBox.textContent = text;
  alarmBox.style.backgroundColor = playSound ? "#7a0000" : "#333";

  if (playSound) {
    const audio = document.getElementById("alarmSound");
    audio.currentTime = 0;
    audio.play().catch(() => console.warn("🔇 Ton nicht automatisch abgespielt"));
    vibrate();
  }
}

function vibrate() {
  if ("vibrate" in navigator) {
    navigator.vibrate([300, 200, 300]);
  }
}

function logMessage(text) {
  const logList = document.getElementById("logList");
  const li = document.createElement("li");
  li.textContent = text;
  logList.prepend(li);
}
