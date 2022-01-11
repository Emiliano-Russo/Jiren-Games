import React, { useEffect, useState } from "react";
import { Game } from "../../Models/Game";
import { GameCard } from "../../Components/React/GameCard";
import { useDispatch } from "react-redux";
import { addDownload } from "../../Redux/downloadSlice";
import { useNavigate } from "react-router-dom";
import { Options } from "got/dist/source";

const dummyData: Game[] = [
  {
    name: "7 DAYS TO DIE ALPHA 20 B238 PC ESPAÑOL + ONLINE STEAM V2",
    imgUrl:
      "https://pivigames.blog/wp-content/uploads/2018/11/Descargar-7-Days-to-Die-Alpha-17-Full-PC-Espa%C3%B1ol-Gratis-min.jpg",
    linkMediafire: [
      "https://www.mediafire.com/file/mdh699yze0f2ara/7.Days.to.Die.A20.B238.7z/file",
    ],
  },
  {
    name: "BEAMNG DRIVE V0.24.1.1 PC + ONLINE STEAM",
    imgUrl:
      "https://pivigames.blog/wp-content/uploads/2017/04/BeamNG-drive-Free-Download.jpeg",
    linkMediafire: [
      "https://www.mediafire.com/file/cselc63645vnkz7/BeamNG.Drive.v0.24.1.1-0xdeadc0de.7z/file",
    ],
  },
];

export function Store() {
  const [games, setGames] = useState(dummyData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDownload = (name: string, links: string[]) => {
    const gameObj = {
      name,
      links,
    };
    dispatch(addDownload(gameObj));
    navigate("/download");
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
      {games.map((game) => {
        return <GameCard game={game} onDownload={onDownload} />;
      })}
    </div>
  );
}

/*
1) Llamamos a la base de datos y buscamos los primeros 10 juegos (que un juego?)  
un juego es un objeto que tiene {nombre, imagen, linkMediafire} 
2) Renderisar los el array de juegos en tarjetitas
3) Si a un juego se le hace click download => Empieza la descarga (redireccionando al usuario a downloads)
*/
