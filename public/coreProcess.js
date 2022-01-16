const https = require("https");
const fs = require("fs");
const StreamZip = require("node-stream-zip");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");
const { getOutputFileNames } = require("typescript");
const os = require("os");
const username = os.userInfo().username;

const folderDest = "C:/Users/" + username + "/Documents/JirenGames";

module.exports.download = async function download(event, game) {
  console.log("Creating Folder...");
  fs.mkdirSync(folderDest + "/" + game.title, (err) => {
    console.log("**ERROR**");
    console.log(err);
  });
  console.log("Starting Download...");
  const links = game.downloadLinks;
  for (link of links) {
    console.log("Downloading link: " + link);
    const result = await downloadProcess(link, game.title);
    console.log("passing result");
  }
  event.sender.send("download-ready");
};

function downloadProcess(linkWeb, folderName) {
  return new Promise(async function (resolve, reject) {
    console.log("Fetching: ..." + linkWeb);
    const link = await fetchMediafireDownloadLink(linkWeb);
    const fileName = await fetchFileName(linkWeb);
    console.log("Downloading...");
    const finalDest = folderDest + "/" + folderName + "/" + fileName;
    console.log("final dest: " + finalDest);
    const result = await download(link, finalDest);
    console.log("Download finished");
    resolve();
  });
}

function fetchFileName(mediafireLink) {
  return new Promise(async function (resolve, reject) {
    const resp = await axios.default.get(mediafireLink);
    const dom = new jsdom.JSDOM(resp.data);
    const elements = dom.window.document.getElementsByClassName("dl-btn-label");
    resolve(elements[0].title);
  });
}

/*function downloadProcess(linkWeb) {
  return new Promise(async function (resolve, reject) {
    console.log("Fetching: ..." + linkWeb);
    fetchMediafireDownloadLink(linkWeb).then((downloadLink) => {
      console.log("Downloading...");
      download(downloadLink, dest).then(() => {
        console.log("Download finished!");
      });
      reject("Error");
    });
    reject();
  });
}*/

function fetchMediafireDownloadLink(mediafireLink) {
  return new Promise(async function (resolve, reject) {
    //const res = await got(mediafireLink);
    const resp = await axios.default.get(mediafireLink);
    const dom = new jsdom.JSDOM(resp.data);
    const elements = dom.window.document.querySelectorAll("a");
    elements.forEach((el) => {
      if (el.text.includes("Download (")) {
        const link = el.href;
        resolve(link);
      }
    });
    reject();
  });
}

const download = function (url, dest) {
  return new Promise(async function (resolve, reject) {
    var file = fs.createWriteStream(dest);
    var request = https
      .get(url, function (response) {
        response.pipe(file);
        //progresoDescarga(response);
      })
      .on("error", function (err) {
        // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        reject(err.message);
      });
    file.on("finish", () => {
      resolve();
    });
  });
};

//dir example: "C:/Users/emili/Desktop/"
//dest example: "C:/Users/emili/Desktop/"
module.exports.uncompressZip = function uncompressZip(dir, des) {
  return new Promise(async function (resolve, reject) {
    const zip = new StreamZip.async({ file: dir });
    zip.entries().then((entries) => {
      for (const entry of Object.values(entries)) {
        if (entry.isDirectory) fs.mkdir(dir + entry.name, (e) => {});
        zip.extract(entry.name, des + entry.name);
      }
      resolve();
    });
  });
};
