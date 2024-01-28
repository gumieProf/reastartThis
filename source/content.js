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
var key;
var onkey = false;
var videos;
var onshift = false;
var onctrl = false;
var isopen = false;
async function load() {
  key = (await chrome.storage.sync.get("key"))["key"];
  console.log(key);
}
document.onload = function () {
  window.addEventListener("keydown", function (e) {
    if (key) {
      if (e.key.toUpperCase() === key) {
        onkey = true;
      } else {
        onkey = false;
      }
      if (e.ctrlKey === true) {
        onctrl = true;
      } else {
        onctrl = false;
      }
      if (e.shiftKey === true) {
        onshift = true;
      } else {
        onshift = false;
      }
    }
    return false;
  });
  window.addEventListener("keyup", function () {
    onkey = false;
    onshift = false;
    onctrl = false;
    return false;
  });
  window.addEventListener("blur", function () {
    isopen = false;
  });
  function watch() {
    videos = document.querySelectorAll("a[href^='/watch?v=']");
    videos.forEach((elem) => {
      var href = elem.getAttribute("href");
      elem.addEventListener("click", function (e) {
        var link = href.substring(0, href.indexOf("&t="));
        if (onkey === true) {
          e.stopPropagation();
          if (onctrl === true && isopen === false) {
            window.open(link, "_blank");
            isopen = true;
          } else if (onshift === true && isopen === false) {
            window.open(link);
            isopen = true;
          } else {
            location.replace(link);
            location.reload();
          }
        }
        return false;
      });
    });
  }
  new MutationObserver(function () {
    load().then(watch());
  }).observe(document.body, { childList: true });
  watch();
};
