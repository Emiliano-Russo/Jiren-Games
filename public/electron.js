// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { beginInstallationCycle } = require("./gameManipulation/installationCycle/main.cjs");
const fs = require("fs");
const os = require("os");
const username = os.userInfo().username;
const { playGame } = require("./gameManipulation/gameStarter.cjs");
const { deleteGame } = require("./gameManipulation/gameRemover.cjs");
const { getInstalledGames } = require("./gameManipulation/gameFinder.cjs");
const { getPage } = require("./wish/main.cjs");

const dir = "C:/Users/" + username + "/Documents/JirenGames";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, (err) => {
    console.log("**ERROR**");
    console.log(err);
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: true, // removes the frame from the BrowserWindow. It is advised that you either create a custom menu bar or remove this line
    webPreferences: {
      devTools: isDev, // toggles whether devtools are available. to use node write window.require('<node-name>')
      nodeIntegration: true, // turn this off if you don't mean to use node
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  //dialog.showErrorBox("ERROR");
  // load the index.html of the app. (or localhost on port 3000 if you're in development)
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  // Open the DevTools. will only work if webPreferences::devTools is true
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") app.quit();
  console.log("window-all-closed!");
  app.quit();
});

app.on("quit", () => {
  console.log("quit!");
  app.quit();
});

ipcMain.on("download", async function (event, game) {
  beginInstallationCycle(event, game);
});

ipcMain.on("get-installed-games", function (event, arg) {
  const gameList = getInstalledGames(dir);
  event.sender.send("get-installed-games", gameList);
});

ipcMain.on("play-game", function (event, gameName) {
  playGame(gameName, dir);
});

ipcMain.on("delete-game", function (event, gameName) {
  deleteGame(gameName, dir);
});

ipcMain.on("delete-game", function (event, gameName) {
  deleteGame(gameName, dir);
});

ipcMain.on("get-page", function (event, pageNmbr) {
  console.log("IPCMAIN.ON (GET-PAGE)");
  getPage(pageNmbr, event);
});
