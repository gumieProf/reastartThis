/*
MIT License

Copyright (c) 2024 gumieProf

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

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
  chrome.storage.sync.get({ key: "R" }, function (items) {
    text.innerHTML = items.key.toUpperCase();
  });
  function setKey(e) {
    if (!ignore.includes(e.key)) {
      text.innerHTML = e.key.toUpperCase();
      chrome.storage.sync.set({ key: e.key });
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
