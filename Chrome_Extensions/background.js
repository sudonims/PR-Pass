var sample = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "$",
  "?",
];

const wrap = (string) => {
  ans = [];
  for (let i = 0; i < string.length; i += 12) {
    a = string.slice(i, i + 12);
    ans.push(a);
  }
  return ans;
};

function add(a, b) {
  a = a.toString();
  b = b.toString();

  if (a == "" || typeof a == undefined) {
    return b;
  }
  ans = "";
  if (a.length == b.length) {
    for (let i = 0; i < a.length; i++) {
      ans += sample[(a[i].charCodeAt(0) + b[i].charCodeAt(0)) % 72];
    }
  } else {
    for (let i = 0; i < b.length; i++) {
      ans += sample[(a[i].charCodeAt(0) + b[i].charCodeAt(0)) % 72];
    }
    ans += a.slice(b.length, a.length);
  }
  return ans.toString();
}

function getData() {
  return new Promise(async function (resolve) {
    const data = await fetch(chrome.runtime.getURL("cipher.json"), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => response);
    console.log(data);
    resolve(data);
  });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const data = await getData().then((res) => res);
  if (request.generate == true) {
    const initPass = request.init_pass;
    console.log(initPass);
    chrome.storage.sync.get(["lucky"], (lucky) => {
      console.log(lucky);
      var luck = parseInt(lucky.lucky);
      var luck1 = luck % 5;
      luck1 = `${luck1}`;
      var ans = "";
      for (let i = 0; i < initPass.length; i++) {
        a = initPass[i];
        if (/[a-zA-Z]/.test(a)) {
          ans += data[luck1][a];
        } else {
          ans += a;
        }
      }
      ans = wrap(ans);
      console.log("ans", ans);
      luck += 100;
      luck %= 72;
      let ans1 = sample[luck].toString();
      for (let i = 1; i < 12; i++) {
        ans1 += sample[ans1[i - 1].charCodeAt(0) % 72];
      }

      for (let i = 0; i < ans.length; i++) {
        ans1 = add(ans1, ans[i]);
      }
      luck += initPass.length + ans.length * initPass.length;
      luck %= 72;
      let char1 = sample[(luck % 26) + 26] + sample[((luck + 111) % 10) + 52]; // HAVE SINGLE CHARS
      let char3 = sample[((luck + 222) % 10) + 62] + sample[(luck + 300) % 26];

      luck = (initPass.length * luck) % ans1.length;

      ans1 = ans1.slice(0, luck) + char1 + ans1.slice(luck, ans1.length);

      luck += initPass.length + ans.length;
      luck %= ans1.length;

      ans1 = ans1.slice(0, luck) + char3 + ans1.slice(luck, ans1.length);

      if (request.inExt) {
        chrome.runtime.sendMessage({
          generated: true,
          gen_pass: ans1,
        });
      } else {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              generated: true,
              gen_pass: ans1,
            });
          }
        );
      }
    });
  }
});

chrome.contextMenus.create({
  id: "0",
  title: "Add Password",
  contexts: ["editable"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      contextClicked: true,
    });
  });
});
