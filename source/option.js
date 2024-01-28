var text;
var btn;
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
  btn = document.querySelector("#record");
  text = document.querySelector("#seted");
  chrome.storage.local.get({ key: "R" }, function (items) {
    text.innerHTML = items.key.toUpperCase();
  });
  function setKey(e) {
    if (!ignore.includes(e.key)) {
      text.innerHTML = e.key.toUpperCase();
      chrome.storage.local.set({ key: e.key });
      window.removeEventListener("keydown", setKey, true);
      btn.style.background = "white";
      btn.style.color = "black";
    }
  }
  btn.addEventListener("click", function () {
    window.addEventListener("keydown", setKey, true);
    btn.style.background = "red";
    btn.style.color = "white";
    return false;
  });
};
