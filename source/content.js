window.onload = function () {
  var onkey;
  var videos;
  chrome.storage.local.get("key", function (items) {
    window.addEventListener("keydown", function (e) {
      if (e.key === items.key) {
        onkey = true;
      } else {
        onkey = false;
      }
      return false;
    });
    window.addEventListener("keyup", function () {
      onkey = false;
      return false;
    });
    new MutationObserver(function () {
      var added = [];
      videos = document.querySelectorAll("a[href^='/watch?v=']");
      videos.forEach((elem) => {
        var href = elem.getAttribute("href");
        if (!added.includes(elem) && href.match(/&t=[0-9]/)) {
          added.push(elem);
          elem.addEventListener("click", function () {
            if (onkey === true) {
              var link = href.substring(0, href.indexOf("&t="));
              location.replace(link);
            }
            return false;
          });
        }
      });
    }).observe(document.body, { childList: true });
  });
};
