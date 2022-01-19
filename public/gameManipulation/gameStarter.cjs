const exec = require("child_process").execFile;
const fs = require("fs");
const path = require("path");

//gameName == game.title == folder Name
module.exports.playGame = function playGame(gameName, allGamesDirectory) {
  const exeLocation = getGameExe(gameName, allGamesDirectory);
  exec(exeLocation, function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};

function getGameExe(gameName, allGamesDirectory) {
  //Magic
  const finalDir = allGamesDirectory + "/" + gameName + "/Uncompress";
  const exeLocation = fromDir(finalDir, ".exe");
  return exeLocation;
}

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    return;
  }
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      const result = fromDir(filename, filter); //recurse
      if (result === undefined) continue;
      else return result;
    } else if (filename.indexOf(filter) >= 0) {
      return filename;
    }
  }
}
