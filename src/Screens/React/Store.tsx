import React, { useEffect, useState } from "react";
import { Game } from "../../Models/Game";
import { GameCard } from "../../Components/React/GameCard";
import { useDispatch } from "react-redux";
import { addDownload } from "../../Redux/downloadSlice";
import { useNavigate } from "react-router-dom";
import { Options } from "got/dist/source";
import { Memory } from "../../Storage/GamePhases";
import { clone } from "../../Utils/Cloner";
import { FireStoreController } from "../../Storage/FireStoreController";
import "../Sass/Store.scss";

export function Store() {
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

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
  };

  const onRefresh = () => {
    setLoadingGames(true);
    prepareList();
  };

  return (
    <div>
      <button id="refreshBtn" onClick={onRefresh}>
        Refresh
      </button>
      <div className="gameList">
        {loadingGames ? (
          <div className="spinner"></div>
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
