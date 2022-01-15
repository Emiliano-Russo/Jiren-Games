import { Game } from "../Models/Game";

export class FireStoreController {
  private static _instance: FireStoreController;
  private constructor() {
    //...
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  gameList: Game[] = [];

  fetchGames(amount: number, startAtIndex: number): Game[] {
    return mockData.slice(startAtIndex, startAtIndex + amount);
  }
  getGame(title: string): Game | undefined {
    return mockData.find((game) => {
      return game.title === title;
    });
  }
}

const mockData: Game[] = [
  {
    title: "FARM TOGETHER PC ESPAÑOL CHIKPEA+ ONLINE STEAM V2",
    imgUrl: "https://pivigames.blog/wp-content/uploads/2019/07/Descargar-Farm-together-PC-Espa%C3%B1ol-Gratis.jpg",
    downloadLinks: ["https://www.mediafire.com/file/woe4ls041au851e/F4rmTo.v14.01.2022.rar/file"],
    crackUrl: "https://racaty.net/wovyh6n3s1lu",
    description:
      "¡Empieza desde cero, con un pequeño huerto, y termina con una impresionante granja que se extiende más alla de donde alcanza la vista!",
    totalSize: "600 MB",
    youtubeTrailerUrl: "https://www.youtube.com/watch?v=SNSJWo_gKNo",
  },
  {
    title: "GREEN HELL PC ESPAÑOL V2.1.8 + ONLINE STEAM V3",
    imgUrl: "https://pivigames.blog/wp-content/uploads/2018/08/Green-Hell-Free-Download-min.jpg",
    downloadLinks: ["https://racaty.net/zuqpeuy38bly"],
    description:
      "Descargar Green Hell para PC en Español un juego de supervivencia y lucha agobiante ambientado en una Isla amazónica; aquí el jugador debe sobrevivir recolectando los recursos suficientes, crafteando y haciendo frente a los diversos desafíos que se le presentarán",
    totalSize: "4.2 GB",
    youtubeTrailerUrl: "https://youtu.be/0Ku8JIW7Ulg",
  },
  {
    title: "7 DAYS TO DIE ALPHA 20 B238 PC ESPAÑOL + ONLINE STEAM V2",
    imgUrl:
      "https://pivigames.blog/wp-content/uploads/2018/11/Descargar-7-Days-to-Die-Alpha-17-Full-PC-Espa%C3%B1ol-Gratis-min.jpg",
    downloadLinks: ["https://www.mediafire.com/file/mdh699yze0f2ara/7.Days.to.Die.A20.B238.7z/file"],
    crackUrl: "https://racaty.net/8amb0l3cgkdi",
    description:
      "Descargar Days To Die Alpha 20 para PC en Español el juego comienza en un contexto postapocalíptico en el que el mundo tal y como lo conocemos ha sido arrasado en una hipotética III Guerra Mundial. ",
    totalSize: "7.1 GB",
    youtubeTrailerUrl: "https://youtu.be/TCI12fe2s3I",
  },
];
