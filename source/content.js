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

window.onload = function () {
  var onkey = false;
  var videos;
  var onshift = false;
  var onctrl = false;
  var isopen = false;
  chrome.storage.local.get("key", function (items) {
    window.addEventListener("keydown", function (e) {
      if (e.key === items.key) {
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
      return false;
    });
    window.addEventListener("keyup", function () {
      onkey = false;
      onshift = false;
      onctrl = false;
      return false;
    });
    window.onblur(function () {
      isopen = false;
    });
    new MutationObserver(function () {
      var added = [];
      videos = document.querySelectorAll("a[href^='/watch?v=']");
      videos.forEach((elem) => {
        var href = elem.getAttribute("href");
        if (!added.includes(elem) && href.match(/&t=[0-9]/)) {
          added.push(elem);
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
              }
            }
            return false;
          });
        }
      });
    }).observe(document.body, { childList: true });
  });
};
