const axios = require("axios");
const cheerio = require("cheerio");
//const pretty = require("pretty");
const fs = require("fs");
console.log(fs);

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

async function filter(dataArr) {
  let filtered = dataArr.filter((el, index, arr) => {
    if (el === arr[index - 1]) return false;
    else return true;
  });
  return filtered;
}

async function scrapeData(url) {
  try {
    const { data } = await axios(url);
    const chrs = cheerio.load(data);
    const list = chrs("div.AZ_results ul li a");
    let names = [];
    list.each((i, el) => {
      const name = chrs(el).text().split(" ")[0].toLowerCase();
      names.push(name);
    });
    return filter(names);
  } catch (err) {
    console.log(err);
  }
}

async function getAllDrugs() {
  let allNames = {};
  for await (let letter of alphabet) {
    let nameArr = await scrapeData(
      `https://www.rxlist.com/drugs/alpha_${letter}.htm`
    );
    allNames[letter] = nameArr;
  }
  return allNames;
}

async function printToFile() {
  const content = await getAllDrugs();
  fs.writeFile("./test.json", JSON.stringify(content), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
printToFile();
