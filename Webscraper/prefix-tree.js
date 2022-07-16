const jeyson = require("./test.json");
const fs = require("fs");
const alphabet = [
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
  ];
function getTree(letter) {
  let a = {};
  let aa = {};
  let aaa = {};
  let aaaa = {};
  const ap = jeyson[letter].map((item) => {
    let prefix = item.slice(0, 2);
    if (a[prefix] === undefined) {
      a[prefix] = {};
      a[prefix][item] = item;
    } else a[prefix][item] = item;
  });
  for (let prefix of Object.keys(a)) {
    for (let item of Object.keys(a[prefix])) {
      let newprefix = item.slice(0, 3);
      if (aa[prefix] === undefined) aa[prefix] = {};
      if (aa[prefix][newprefix] === undefined) {
        aa[prefix][newprefix] = {};
        aa[prefix][newprefix][item] = item;
      } else aa[prefix][newprefix][item] = item;
    }
  }

  for (let prepreprefix of Object.keys(aa)) {
    for (let preprefix of Object.keys(aa[prepreprefix])) {
      for (let item of Object.keys(aa[prepreprefix][preprefix])) {
        let prefix = item.slice(0, 4);
        if (aaa[prepreprefix] === undefined) aaa[prepreprefix] = {};
        if (aaa[prepreprefix][preprefix] === undefined)
          aaa[prepreprefix][preprefix] = {};
        if (aaa[prepreprefix][preprefix][prefix] === undefined) {
          aaa[prepreprefix][preprefix][prefix];
          aaa[prepreprefix][preprefix][prefix] = item;
        } else aaa[prepreprefix][preprefix][prefix] = item;
      }
    }
  }
  for (let prefix4 of Object.keys(aaa)) {
    for (let prepreprefix of Object.keys(aaa[prefix4])) {
      for (let preprefix of Object.keys(aaa[prefix4][prepreprefix])) {
        let item = aaa[prefix4][prepreprefix][preprefix];
        let prefix = item.slice(0, 5);
        if (aaaa[prefix4] === undefined) {
          aaaa[prefix4] = {};
        }
        if (aaaa[prefix4][prepreprefix] === undefined) {
          aaaa[prefix4][prepreprefix] = {};
        }
        if (aaaa[prefix4][prepreprefix][preprefix] === undefined) {
          aaaa[prefix4][prepreprefix][preprefix] = {};
        }
        if (aaaa[prefix4][prepreprefix][preprefix][prefix] === undefined) {
          aaaa[prefix4][prepreprefix][preprefix][prefix] = {};
          aaaa[prefix4][prepreprefix][preprefix][prefix][item] = item;
        } else aaaa[prefix4][prepreprefix][preprefix][prefix] = item;
      }
    }
  }
  return aaaa;
}
async function printToFile() {
  let trie = {};
  alphabet.forEach((letter) => {
    trie[letter] = getTree(letter);
  });
  fs.writeFile("./trie.json", JSON.stringify(trie), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
printToFile();
