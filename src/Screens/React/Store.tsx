import React, { useEffect, useState } from "react";
import { Game } from "../../Models/Game";
import { GameCard } from "../../Components/React/GameCard";
import { Memory } from "../../Storage/GamePhases";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Button, Spin } from "antd";
import "../Sass/Store.scss";
import { message } from "antd";

export function Store() {
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  const success = (title: string) => {
    message.success(title + " => Now in Downloads");
  };

  const prepareList = async () => {
    const gameList: Game[] = await FireStoreController.Instance.getAllGames();
    setGames(gameList);
    Memory.setNewGameList(gameList);
    setLoadingGames(false);
  };

  useEffect(() => {
    if (!Memory.gameListExist()) {
      setLoadingGames(true);
      prepareList();
    } else {
      setGames(Memory.getGameList());
    }
  }, []);

  const onDownload = (name: string) => {
    const index = games.findIndex((x, index) => {
      return x.title == name;
    });
    Memory.addGameToDownloads(games[index]);
    success(name);
  };

  const onRefresh = () => {
    setLoadingGames(true);
    prepareList();
  };

  return (
    <div>
      <Button id="refreshBtn" onClick={onRefresh}>
        Refresh
      </Button>
      <div className="gameList">
        {loadingGames ? (
          <Spin size="large" />
        ) : (
          games.map((game: any) => {
            return (
              <GameCard
                key={game.title}
                title={game.title}
                imgUrl={game.imgUrl}
                btnLabel="Download"
                onBtnClick={onDownload}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
