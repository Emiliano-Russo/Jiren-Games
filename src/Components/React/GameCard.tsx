import React from "react";
import { Game } from "../../Models/Game";
import { GamePhase } from "../../Models/GamePhases";
import "../Sass/GameCard.scss";

interface props {
  game: Game;
  onDownload: (name: string, links: string[]) => void;
  gamePhase: GamePhase;
}

export const GameCard = (props: props) => {
  return (
    <div className="gameCard">
      <img src={props.game.imgUrl} />
      <h2>{props.game.name}</h2>
      {props.gamePhase === GamePhase.onStore ? (
        <button
          onClick={() =>
            props.onDownload(props.game.name, props.game.linkMediafire)
          }
        >
          Add to Downloads
        </button>
      ) : props.gamePhase === GamePhase.onDownload ? (
        <p style={{ color: "royalblue" }}>On Downloads</p>
      ) : (
        <p style={{ color: "green" }}>On Library</p>
      )}
    </div>
  );
};
