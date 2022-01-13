import React, { useEffect, useState } from "react";
import { Game } from "../../Models/Game";
import { GameCard } from "../../Components/React/GameCard";
import { useDispatch } from "react-redux";
import { addDownload } from "../../Redux/downloadSlice";
import { useNavigate } from "react-router-dom";
import { Options } from "got/dist/source";
import { dummyData } from "../../dummyData";
import { GamePhase } from "../../Models/GamePhases";
import { Memory } from "../../LocalStorage/Storage";
import { clone } from "../../Utils/Cloner";

export function Store() {
  const onDownloadList = Memory.getOnDownloadListGames();
  const onLibraryList = Memory.getOnLibraryListGames();
  const [games, setGames] = useState<Game[]>(dummyData);
  const [gamesOnDownload, setGamesOnDownload] = useState<string[]>(onDownloadList);
  const [gamesOnLibrary, setGamesOnLibrary] = useState<string[]>(onLibraryList);

  const onDownload = (name: string) => {
    Memory.addGameToDownloads(name);
    setGamesOnDownload((prev) => {
      const clonedState = clone(prev);
      clonedState.push(name);
      return clonedState;
    });
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
              game={game}
              onDownload={onDownload}
              gamePhase={
                gamesOnDownload.includes(game.name)
                  ? GamePhase.onDownload
                  : gamesOnLibrary.includes(game.name)
                  ? GamePhase.onLibrary
                  : GamePhase.onStore
              }
            />
          );
        })
      )}
    </div>
  );
}

/*
1) Llamamos a la base de datos y buscamos los primeros 10 juegos (que un juego?)  
un juego es un objeto que tiene {nombre, imagen, linkMediafire} 
2) Renderisar los el array de juegos en tarjetitas
3) Si a un juego se le hace click download => Empieza la descarga (redireccionando al usuario a downloads)
*/
