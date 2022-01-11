import React from "react";
import { Game } from "../../Models/Game";
import "../Sass/GameCard.scss";

interface props {
  game: Game;
  onDownload: (name: string, links: string[]) => void;
}

export const GameCard = (props: props) => {
  return (
    <div className="gameCard">
      <img src={props.game.imgUrl} />
      <h2>{props.game.name}</h2>
      <button
        onClick={() =>
          props.onDownload(props.game.name, props.game.linkMediafire)
        }
      >
        Download
      </button>
    </div>
  );
};
