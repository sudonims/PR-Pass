let clickedElement;

// document.addEventListener("DOMContentLoaded", function () {});

window.onload = () => {
  document.addEventListener("contextmenu", function (event) {
    clickedElement = event.target;
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contextClicked) {
    chrome.runtime.sendMessage({
      generate: true,
      init_pass: clickedElement.value,
      inExt: false,
    });
  }
  if (request.generated) {
    clickedElement.value = request.gen_pass;
  }
});
