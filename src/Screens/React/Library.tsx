import React, { useEffect, useState } from "react";
import { GameCard } from "../../Components/React/GameCard";
import { Game } from "../../Models/Game";
import { FireStoreController } from "../../Storage/FireStoreController";
import { clone } from "../../Utils/Cloner";
import "../Sass/Library.scss";

const { ipcRenderer } = window.require("electron");

export function Library() {
  const [gameList, setGameList] = useState<Game[]>([]);

  useEffect(() => {
    ipcRenderer.on("get-installed-games", onGettingInstalledGames);
    ipcRenderer.send("get-installed-games", "");
    return () => {
      ipcRenderer.removeListener("get-installed-games", onGettingInstalledGames);
    };
  }, []);

  const onGettingInstalledGames = (event: any, gameNameList: string[]) => {
    const arr: any[] = [];
    gameNameList.map((name) => {
      const game: Game | undefined = FireStoreController.Instance.getGame(name);
      if (game) arr.push(game);
    });
    setGameList(arr);
  };

  const onBtnPlay = (gameName: string) => {
    ipcRenderer.send("play-game", gameName);
  };

  const onDeleteGame = (gameName: string) => {
    ipcRenderer.send("delete-game", gameName);
    clickRefresh();
  };

  const clickRefresh = () => {
    ipcRenderer.send("get-installed-games", "");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="gameList">
        {gameList.map((game) => {
          return (
            <GameCard
              key={game.title}
              imgUrl={game.imgUrl}
              btnLabel="Play"
              onBtnClick={onBtnPlay}
              title={game.title}
              onClose={onDeleteGame}
            />
          );
        })}
      </div>
    </div>
  );
}
