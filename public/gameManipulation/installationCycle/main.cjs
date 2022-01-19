const fs = require("fs");
const os = require("os");
const username = os.userInfo().username;
const { unCompress } = require("./unCompress.cjs");
const { fetchLink } = require("./fetchLink.cjs");
const { downloadGame } = require("./download.cjs");

const folderDest = "C:/Users/" + username + "/Documents/JirenGames";

module.exports.download = async function download(event, game) {
  console.log("Creating Folder...");
  createFolder(folderDest + "/" + game.title);
  console.log("*Starting Download*");
  const links = game.downloadLinks;
  for (link of links) {
    console.log("Downloading link: " + link);
    const result = await downloadProcess(link, game.title, event);
  }
  console.log("Process Ready!");
  event.sender.send("download-ready", game.title);
};

function createFolder(dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, () => {});
}

function downloadProcess(linkWeb, folderName, event) {
  return new Promise(async function (resolve, reject) {
    event.sender.send("feedBack", "Preparing Download...");
    console.log("Fetching:... " + linkWeb);
    const link = await fetchLink(linkWeb);
    console.log("Getting file name...");
    const fileName = getFileName(linkWeb);
    console.log("File Name: " + fileName);
    console.log("Downloading...");
    const finalDest = `${folderDest}/${folderName}/${fileName}`;
    console.log("final dest: " + finalDest);
    const result = await downloadGame(link, finalDest, event);
    console.log("Download finished");
    console.log("Uncompressing...");
    event.sender.send("feedBack", "Uncompressing...");
    const res = await unCompress(finalDest, `${folderDest}/${folderName}/Uncompress`);
    resolve();
  });
}

function getFileName(linkWeb) {
  const penultinate = linkWeb.lastIndexOf("/", linkWeb.lastIndexOf("/") - 1);
  const last = linkWeb.lastIndexOf("/");
  const name = linkWeb.slice(penultinate + 1, last);
  return name;
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
