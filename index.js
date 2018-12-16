window.onload = function () {
  sizeWindow()
};

window.onresize = function () {
  sizeWindow()
}

var sizeWindow = function () {
  var html = document.querySelector('html');
  if (html.scrollHeight > screen.height) {
    html.classList.remove('page-short');
  } else {
    html.classList.add('page-short');
  }
}
