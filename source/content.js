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
