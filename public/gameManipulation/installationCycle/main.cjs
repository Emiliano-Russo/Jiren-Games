const fs = require("fs");
const os = require("os");
const username = os.userInfo().username;
const { unCompress } = require("./uncompressor.cjs");
const { fetchLink } = require("./linkCollector.cjs");
const { downloadGame } = require("./downloader.cjs");
const { crackGame } = require("./gameCracker.cjs");

const jirenGamesFolder = "C:/Users/" + username + "/Documents/JirenGames";

module.exports.beginInstallationCycle = async function beginInstallationCycle(event, game) {
  createFolder(jirenGamesFolder + "/" + game.title);
  const listLocationCompressedFiles = await downloadAllLinks(game.downloadLinks, game.title, event);
  const gameLocation = `${jirenGamesFolder}/${game.title}/Uncompress`;
  const res = await unCompressAllFiles(listLocationCompressedFiles, gameLocation, event);
  if (game.crackUrl) crackGame(game.crackUrl, gameLocation, event);
  event.sender.send("download-ready", game.title);
};

async function downloadAllLinks(links, gameName, event) {
  return new Promise(async function (resolve, reject) {
    const listLocations = [];
    for (link of links) {
      const fileLocation = await downloadProcess(link, gameName, event);
      listLocations.push(fileLocation);
    }
    resolve(listLocations);
  });
}

//This function needs rework because when then list is > 1, does not work
async function unCompressAllFiles(listLocationCompressedFiles, destiny, event) {
  return new Promise(async function (resolve, reject) {
    event.sender.send("feedBack", "Uncompressing...");
    for (locationCompressedFile of listLocationCompressedFiles) {
      const resUncompress = await unCompress(locationCompressedFile, destiny);
    }
    resolve();
  });
}

function createFolder(dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, () => {});
}

function downloadProcess(linkWeb, folderName, event) {
  return new Promise(async function (resolve, reject) {
    event.sender.send("feedBack", "Preparing Download...");
    const link = await fetchLink(linkWeb);
    const fileName = getFileName(linkWeb);
    const finalDest = `${jirenGamesFolder}/${folderName}/${fileName}`;
    const result = await downloadGame(link, finalDest, event);
    resolve(finalDest);
  });
}

function getFileName(linkWeb) {
  const penultinate = linkWeb.lastIndexOf("/", linkWeb.lastIndexOf("/") - 1);
  const last = linkWeb.lastIndexOf("/");
  const name = linkWeb.slice(penultinate + 1, last);
  return name;
}
