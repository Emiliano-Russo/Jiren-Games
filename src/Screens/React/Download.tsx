import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
//import { fetchMediafireDownloadLink } from "../../Core/Core";
// renderer process, for example app/renderer.js
const electron = window.require("electron");
const mainProcess = electron.remote.require("../../../public/electron-main.js");

export function Download() {
  const [link, setLink] = useState("");

  const games = useSelector(
    (state: RootState) => state.download.gamesToDownload
  );

  useEffect(() => {
    const linkMediafire = games[0].links[0];
    /*fetchMediafireDownloadLink(linkMediafire).then((downloadLink) => {
      if (downloadLink != undefined) setLink(downloadLink);
      else console.log("ERROR!!");
    });*/
    mainProcess.test();
  }, []);

  return (
    <div>
      {games.map((game) => {
        return <h1>Game: {game.name}</h1>;
      })}
      <h1>{link == "" || link === undefined ? "whit out link" : link}</h1>
    </div>
  );
}
