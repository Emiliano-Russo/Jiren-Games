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

export function Store() {
  const [games, setGames] = useState<Game[]>(FireStoreController.Instance.fetchGames(100, 0));

  const onDownload = (name: string) => {
    Memory.addGameToDownloads(name);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "strech",
        justifyContent: "center",
      }}
    >
      {games == [] ? (
        <h1>Loading Games...</h1>
      ) : (
        games.map((game) => {
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
  );
}
