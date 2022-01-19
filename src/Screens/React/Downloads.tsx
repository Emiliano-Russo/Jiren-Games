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
  const [downloadingGameName, setDownloadingGameName] = useState<string>("");
  const [feedBack, setFeedBack] = useState<string>("");

  function onDownloadReady(event: any, arg: any) {
    Memory.removeGameFromDownloads(arg);
    setDownloadingGameName("");
    setFeedBack("");
  }

  function progressDownload(event?: any, arg?: any) {
    setFeedBack(arg);
  }

  useEffect(() => {
    ipcRenderer.on("download-ready", onDownloadReady);
    ipcRenderer.on("feedBack", progressDownload);
    return () => {
      ipcRenderer.removeListener("download-ready", onDownloadReady);
      ipcRenderer.removeListener("feedBack", progressDownload);
    };
  }, []);

  const onRemove = (name: string) => {
    Memory.removeGameFromDownloads(name);
    setGameList(Memory.getOnDownloadListGames());
  };

  const onStartDownload = (title: string) => {
    setDownloadingGameName(title);
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
        <p>{downloadingGameName}</p>
        {feedBack}
        {downloadingGameName != "" ? <div className="spinner"></div> : null}
      </div>
    </div>
  );
}
