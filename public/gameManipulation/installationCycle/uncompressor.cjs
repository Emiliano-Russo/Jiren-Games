const StreamZip = require("node-stream-zip");
const fs = require("fs");
const unrar = require("unrar-promise");
const { detectCompressionType, createFolder } = require("./helper.cjs");

module.exports.unCompress = function unCompress(location, dest) {
  return new Promise(async function (resolve, reject) {
    createFolder(dest);
    const compressionType = detectCompressionType(location);
    if (compressionType == "rar") {
      const result = await unCompressRar(location, dest);
      resolve(result);
    } else if (compressionType == "zip") {
      const result = await uncompressZip(location, dest);
      resolve(result);
    } else {
      reject("Can't uncompress this file (make sure is either .zip or .rar)");
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
