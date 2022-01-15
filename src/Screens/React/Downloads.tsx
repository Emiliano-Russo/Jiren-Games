import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Memory } from "../../Storage/GamePhases";
import { GameCard } from "../../Components/React/GameCard";
import { FireStoreController } from "../../Storage/FireStoreController";

const { ipcRenderer } = window.require("electron");

export function Downloads() {
  const [gameList, setGameList] = useState(Memory.getOnDownloadListGames());

  const onRemove = (name: string) => {
    Memory.removeGameFromDownloads(name);
    setGameList(Memory.getOnDownloadListGames());
  };

  const onStartDownload = (title: string) => {
    ipcRenderer.send("download", FireStoreController.Instance.getGame(title));
  };

  return (
    <div>
      <div className="queue">
        {gameList.map((title) => {
          return (
            <GameCard
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
      <div className="onGoing"></div>
    </div>
  );
}
