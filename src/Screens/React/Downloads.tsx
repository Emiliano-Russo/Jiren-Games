import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const { ipcRenderer } = window.require("electron");

export function Downloads() {
  const [link, setLink] = useState("");

  const gamesToDownload = useSelector(
    (state: RootState) => state.download.gamesToDownload
  );

  const linkWeb =
    "https://www.mediafire.com/file/zv5gcspnn39hrjs/ejemplo.zip/file";

  return (
    <div>
      <h1>Games to download</h1>
      {gamesToDownload.map((toDownloadGame) => {
        return <h3>{toDownloadGame.name}</h3>;
      })}
    </div>
  );
}

//<button onClick={() => ipcRenderer.send("download", linkWeb)}>
//Comminucate nodejs
//</button>
