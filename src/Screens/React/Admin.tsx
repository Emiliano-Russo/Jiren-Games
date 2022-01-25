import React, { useEffect, useRef, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../Sass/Admin.scss";
import { resolve } from "path";
import { FireStoreController } from "../../Storage/FireStoreController";

enum LoginState {
  Checking,
  NotLogged,
  Logged,
}

export function Admin() {
  const [logged, setLogged] = useState(LoginState.Checking);

  useEffect(() => {
    const notParsedToken = localStorage.getItem("adminToken");
    if (notParsedToken != null) {
      setLogged(LoginState.Logged);
    } else {
      setLogged(LoginState.NotLogged);
    }
  }, []);

  const login = async () => {
    setLogged(LoginState.Checking);
    const element = document.getElementById("inputToken");
    const inputTkn = element?.value;
    const isValidToken = await FireStoreController.Instance.tokenIsValid(inputTkn);
    if (isValidToken) {
      localStorage.setItem("adminToken", JSON.stringify(inputTkn));
      setLogged(LoginState.Logged);
    } else setLogged(LoginState.NotLogged);
  };

  if (logged == LoginState.Checking) return <h1 className="AdminPanel">Checking Credentials...</h1>;

  if (logged == LoginState.NotLogged)
    return (
      <div className="AdminPanel">
        <h1>Login</h1>
        <input id="inputToken" placeholder="token" />
        <button onClick={login}>Submit</button>
      </div>
    );

  const onSubmit = () => {
    console.log("Submiting...");
    const gameID: string = document.getElementById("gameID")?.value;
    const newGame = {
      title: document.getElementById("gameID")?.value,
      description: document.getElementById("description")?.value,
      downloadLinks: document.getElementById("downloadLinks")?.value.split(","),
      crackUrl: document.getElementById("crackUrl")?.value,
      totalSize: document.getElementById("totalSize")?.value,
      youtubeTrailerUrl: document.getElementById("youtubeTrailerUrl")?.value,
      imgUrl: document.getElementById("imgUrl")?.value,
    };
    console.log("obj to send: ");
    console.log(newGame);
    FireStoreController.Instance.addGame(gameID, newGame);
  };

  return (
    <div className="AdminPanel">
      <h1>Add New Game</h1>
      <form>
        <input id="gameID" placeholder="Game ID on firebase" />
        <input id="title" placeholder="title" />
        <input id="description" placeholder="description" />
        <input id="downloadLinks" placeholder="download links separated by comma" />
        <input id="imgUrl" placeholder="imgUrl" />
        <input id="totalSize" placeholder="total size: '5GB'" />
        <input id="crackUrl" placeholder="link crack" />
        <input id="youtubeTrailerUrl" placeholder="youtube Trailer URL" />
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
