const https = require("https");
const fs = require("fs");
const fse = require("fs-extra");
const StreamZip = require("node-stream-zip");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");
const { getOutputFileNames } = require("typescript");
const unrar = require("unrar-promise");
const os = require("os");
const username = os.userInfo().username;

const folderDest = "C:/Users/" + username + "/Documents/JirenGames";

module.exports.download = async function download(event, game) {
  console.log("Creating Folder...");
  createFolder(folderDest + "/" + game.title);
  console.log("*Starting Download*");
  const links = game.downloadLinks;
  for (link of links) {
    console.log("Downloading link: " + link);
    const result = await downloadProcess(link, game.title);
    console.log("passing result");
  }
  event.sender.send("download-ready");
};

function createFolder(dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, () => {});
}

function downloadProcess(linkWeb, folderName) {
  return new Promise(async function (resolve, reject) {
    console.log("Fetching:... " + linkWeb);
    const link = await fetchMediafireDownloadLink(linkWeb);
    console.log("Getting file name...");
    const fileName = getFileName(linkWeb);
    console.log("File Name: " + fileName);
    console.log("Downloading...");
    const finalDest = `${folderDest}/${folderName}/${fileName}`;
    console.log("final dest: " + finalDest);
    const result = await download(link, finalDest);
    console.log("Download finished");
    console.log("Uncompressing...");
    createFolder(`${folderDest}/${folderName}/Uncompress`);
    const compressionType = detectCompressionType(link);
    if (compressionType == "rar") {
      const result = await unCompressRar(finalDest, `${folderDest}/${folderName}/Uncompress`);
    } else if (compressionType == "zip") {
      const result = await uncompressZip(finalDest, `${folderDest}/${folderName}/Uncompress`);
    } else {
      //Nothing to do
      console.log("Nothing to do !!! ");
    }
    resolve();
  });
}

function getFileName(linkWeb) {
  const penultinate = linkWeb.lastIndexOf("/", linkWeb.lastIndexOf("/") - 1);
  const last = linkWeb.lastIndexOf("/");
  const name = linkWeb.slice(penultinate + 1, last);
  return name;
}

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
    try {
      var file = fs.createWriteStream(dest);
      var request = https
        .get(url, function (response) {
          response.pipe(file);
          //progresoDescarga(response);
        })
        .on("error", function (err) {
          console.log("#error");
          console.log(err);
          // Handle errors
          fs.unlink(dest); // Delete the file async. (But we don't check the result)
          reject(err.message);
        });
      file.on("finish", () => {
        resolve();
      });
    } catch (err) {
      console.log("ERROR: ");
      console.log(err);
    }
  });
};

function uncompressZip(zipLocation, folderDest) {
  return new Promise(async function (resolve, reject) {
    try {
      const zip = new StreamZip.async({ file: zipLocation });
      const entries = await zip.entries();
      for (const entry of Object.values(entries)) {
        if (entry.isDirectory) fs.mkdirSync(folderDest + "/" + entry.name, (e) => {});
        else {
          const result = await zip.extract(entry.name, folderDest + "/" + entry.name);
        }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function unCompressRar(rarLocation, dest) {
  return unrar.unrar(rarLocation, dest);
}

function detectCompressionType(url) {
  if (url.includes(".rar")) return "rar";
  if (url.includes(".zip")) return "zip";
  return "other";
}

/*
function fetchFileName(mediafireLink) {
  return new Promise(async function (resolve, reject) {
    const resp = await axios.default.get(mediafireLink);
    const dom = new jsdom.JSDOM(resp.data);
    const elements = dom.window.document.getElementsByClassName("dl-btn-label");
    resolve(elements[0].title);
  });
}*/

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
