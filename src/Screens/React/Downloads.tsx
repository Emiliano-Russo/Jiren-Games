import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Memory } from "../../Storage/GamePhases";
import { GameCard } from "../../Components/React/GameCard";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Game } from "../../Models/Game";
import "../Sass/Downloads.scss";
import { clone } from "../../Utils/Cloner";

const { ipcRenderer } = window.require("electron");

export function Downloads() {
  const [gameList, setGameList] = useState(Memory.getOnDownloadListGames());
  const [downloadingGame, setDownloadingGame] = useState<string | undefined>(undefined);

  function onDownloadReady(event: any, arg: any) {
    console.log("Download Ready!!");
    setDownloadingGame(undefined);
  }

  useEffect(() => {
    console.log("UseEffect");
    ipcRenderer.on("download-ready", onDownloadReady);
    return () => {
      ipcRenderer.removeListener("download-ready", onDownloadReady);
    };
  }, []);

  const onRemove = (name: string) => {
    Memory.removeGameFromDownloads(name);
    setGameList(Memory.getOnDownloadListGames());
  };

  const onStartDownload = (title: string) => {
    setDownloadingGame(title);
    setGameList((prev) => {
      const clonedGameList = clone(prev);
      const index = clonedGameList.indexOf(title);
      if (index > -1) {
        clonedGameList.splice(index, 1);
      }
      return clonedGameList;
    });
    ipcRenderer.send("download", FireStoreController.Instance.getGame(title));
  };

  return (
    <div className="downloads">
      <div id="#style-6" className="queue">
        <h1>Queue</h1>
        {gameList.map((title) => {
          return (
            <GameCard
              key={title}
              btnLabel="Start Download"
              onClose={onRemove}
              onBtnClick={onStartDownload}
              title={title}
              imgUrl={
                FireStoreController.Instance.getGame(title) && FireStoreController.Instance.getGame(title)?.imgUrl
                  ? FireStoreController.Instance.getGame(title)?.imgUrl
                  : "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg"
              }
            />
          );
        })}
      </div>
      <div className="downloading">
        <h1>Downloading</h1>
        <p>{downloadingGame ? downloadingGame : null}</p>
        {downloadingGame ? <div className="spinner"></div> : null}
      </div>
    </div>
  );
}
