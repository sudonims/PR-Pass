document.addEventListener("DOMContentLoaded", async function () {
  var submit = document.getElementById("submit");
  var lucky = document.getElementById("lucky");
  var pass = document.getElementById("password");
  var gen_pass = document.getElementById("gen-pass");
  var edit = document.getElementById("edit");
  var body = document.getElementById("body");
  var copy = document.getElementById("copy");

  submit.addEventListener("click", function () {
    // chk=new RegExp("hide");
    var l_num = lucky.value || null;
    var in_pass = pass.value || null;

    console.log(l_num, in_pass);

    if (l_num !== null) {
      chrome.storage.sync.set({ lucky: l_num }, function () {
        chrome.notifications.create("success", {
          type: "basic",
          iconUrl: "logo.png",
          title: "success",
          message: "Lucky Number Successfully saved",
        });
        body.insertBefore(pass, lucky);
        lucky.value = "";
        lucky.remove();
        l_num = 0;
      });
    }

    if (in_pass !== null) {
      chrome.runtime.sendMessage({
        generate: true,
        init_pass: in_pass,
      });

      in_pass = 0;
    }
    console.log(l_num, in_pass);
  });

  edit.addEventListener("click", function () {
    lucky.value = "";
    body.insertBefore(lucky, pass);

    pass.value = "";
    pass.remove();
  });

  chrome.storage.sync.get(["lucky"], (data) => {
    if (data.lucky) {
      lucky.remove();
    }
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.generated) {
      gen_pass.innerHTML = request.gen_pass;
    }
  });

  copy.addEventListener("click", function () {
    navigator.clipboard.writeText(gen_pass.innerHTML).then(
      function () {
        chrome.notifications.create("copy_success", {
          type: "basic",
          iconUrl: "logo.png",
          title: "copy success",
          message: "Password copied on Clipboard successfully",
        });
      },
      function () {
        chrome.notifications.create("copy_fail", {
          type: "basic",
          iconUrl: "logo.png",
          title: "copy_fail",
          message: "Could not copy... Try reloading the extension",
        });
      }
    );
  });
});
