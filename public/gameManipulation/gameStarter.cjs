const exec = require("child_process").execFile;
const fs = require("fs");
const path = require("path");

//gameName == game.title == folder Name
module.exports.playGame = function playGame(gameName, allGamesDirectory) {
  const exeLocation = getGameExe(gameName, allGamesDirectory);
  console.log("**READY LOOK: ");
  console.log(exeLocation);
  exec(exeLocation, function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};

function getGameExe(gameName, allGamesDirectory) {
  //Magic
  const finalDir = allGamesDirectory + "/" + gameName + "/Uncompress";
  const exeLocation = fromDir(finalDir, ".exe");
  console.log("Found something? " + exeLocation);
  return exeLocation;
}

function fromDir(startPath, filter) {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    console.log("for: " + i);
    var filename = path.join(startPath, files[i]);
    console.log("filename: " + filename);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      console.log("----Is directory :D----");
      const result = fromDir(filename, filter); //recurse
      if (result === undefined) continue;
      else return result;
    } else if (filename.indexOf(filter) >= 0) {
      console.log("*/*/*/* found: ", filename);
      return filename;
    }
  }
}
