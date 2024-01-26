var text;
var ignore = [
  "Meta",
  "Ctrl",
  "Alt",
  "Shift",
  "Control",
  "Eisu",
  "KanjiMode",
  "Arrow",
  "Tab",
  "Backspace",
  "CapsLock",
  "Escape",
  "ENTER",
  " ",
];
window.onload = function () {
  text = document.querySelector("#text");
  chrome.storage.local.get({ key: "R" }, function (items) {
    text.value = items.key;
  });
  window.addEventListener("keydown", function (e) {
    if (!ignore.includes(e.key)) {
      text.value = e.key.toUpperCase();
      chrome.storage.local.set({ key: e.key });
    }
  });
};
