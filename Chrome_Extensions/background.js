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

var xhr = new XMLHttpRequest();
var data;
xhr.open("GET", chrome.extension.getURL("cipher.json"), true);
xhr.send();
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4) {
    data = xhr.response;
    data = JSON.parse(data);
    // console.log(data['0']['a']);
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.generate == true) {
        chrome.storage.sync.get(["init_pass"], (initPass) => {
          console.log(initPass);
          chrome.storage.sync.get(["lucky"], (lucky) => {
            console.log(lucky);
            var luck = parseInt(lucky.lucky);
            luck1 = luck % 5;
            luck1 = `${luck1}`;
            var ans = "";
            for (let i = 0; i < initPass.init_pass.length; i++) {
              a = initPass.init_pass[i];
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
            ans1 = sample[luck].toString();
            for (let i = 1; i < 12; i++) {
              ans1 += sample[ans1[i - 1].charCodeAt(0) % 72];
            }

            for (let i = 0; i < ans.length; i++) {
              ans1 = add(ans1, ans[i]);
            }
            luck +=
              initPass.init_pass.length +
              ans.length * initPass.init_pass.length;
            luck %= 72;
            char1 = sample[(luck % 26) + 26] + sample[((luck + 111) % 10) + 52]; // HAVE SINGLE CHARS
            char3 =
              sample[((luck + 222) % 10) + 62] + sample[(luck + 300) % 26];

            luck = (initPass.init_pass.length * luck) % ans1.length;

            ans1 = ans1.slice(0, luck) + char1 + ans1.slice(luck, ans1.length);

            luck += initPass.init_pass.length + ans.length;
            luck %= ans1.length;

            ans1 = ans1.slice(0, luck) + char3 + ans1.slice(luck, ans1.length);

            chrome.storage.sync.set({ gen_pass: ans1 }, () => {
              chrome.runtime.sendMessage({ generated: true });
            });
          });
        });
      }
    });
  }
};

// const print = (data)=>{
//     console.log(data);
// }
