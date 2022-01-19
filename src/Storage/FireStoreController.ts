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
    title: "FARM TOGETHER PC ESPAÑOL CHIKPEA+ ONLINE STEAM V2 (600mb)",
    imgUrl: "https://pivigames.blog/wp-content/uploads/2019/07/Descargar-Farm-together-PC-Espa%C3%B1ol-Gratis.jpg",
    downloadLinks: ["https://www.mediafire.com/file/woe4ls041au851e/F4rmTo.v14.01.2022.rar/file"],
    crackUrl: "https://racaty.net/wovyh6n3s1lu",
    description:
      "¡Empieza desde cero, con un pequeño huerto, y termina con una impresionante granja que se extiende más alla de donde alcanza la vista!",
    totalSize: "600 MB",
    youtubeTrailerUrl: "https://www.youtube.com/watch?v=SNSJWo_gKNo",
  },
  {
    title: "SUPRALAND SIX INCHES UNDER PC ESPAÑOL (6GB 3 Links)",
    imgUrl: "https://pivigames.blog/wp-content/uploads/2022/01/Supraland-Six-Inches-Under-PiviGames.jpg",
    downloadLinks: [
      "https://www.mediafire.com/file/fup4xg9vm5b9wes/Sup6ralandS6ixIU6nder-elamigos.part1.rar/file",
      "https://www.mediafire.com/file/oef9k0292ooocp2/Sup6ralandS6ixIU6nder-elamigos.part2.rar/file",
      "https://www.mediafire.com/file/vxiaaia7ux1aupr/Sup6ralandS6ixIU6nder-elamigos.part3.rar/file",
    ],
    description:
      "Descargar Supraland Six Inches Under PC en Español videojuego de exploración y metroidvania que es una mezcla de Portal, Zelda y Metroid. Exploración, rompecabezas y combate! Un metroidvania en primera persona seis pulgadas debajo de Supraland",
    totalSize: "4.4 GB",
    youtubeTrailerUrl: "https://youtu.be/koqnislFtMA",
  },
  {
    title: "Ejemplo150mb",
    imgUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    downloadLinks: ["https://www.mediafire.com/file/zv5gcspnn39hrjs/ejemplo.zip/file"],
    description: "Esto es un ejemplo",
    totalSize: "150.76MB",
    youtubeTrailerUrl: "",
  },
  {
    title: "FarmTogheter 3 links",
    imgUrl: "https://pivigames.blog/wp-content/uploads/2019/07/Descargar-Farm-together-PC-Espa%C3%B1ol-Gratis.jpg",
    downloadLinks: [
      "https://www.mediafire.com/file/84ezh7dbhssg3fi/Farm+Together+v14.01.2022-PiviGames.blog.part1.rar/file",
      "https://www.mediafire.com/file/9mzc4zwt4gzwmto/Farm+Together+v14.01.2022-PiviGames.blog.part2.rar/file",
      "https://www.mediafire.com/file/bdugzmxb0we9b8e/Farm+Together+v14.01.2022-PiviGames.blog.part3.rar/file",
    ],
    crackUrl: "https://racaty.net/wovyh6n3s1lu",
    description:
      "¡Empieza desde cero, con un pequeño huerto, y termina con una impresionante granja que se extiende más alla de donde alcanza la vista!",
    totalSize: "600 MB",
    youtubeTrailerUrl: "https://www.youtube.com/watch?v=SNSJWo_gKNo",
  },
  {
    title: "STRANDED DEEP PC ESPAÑOL V0.90.11 + ONLINE STEAM (1.5GB)",
    description:
      "Cuando acabe la introducción de la partida habrás naufragado en una minúscula isla desierta: tu nuevo hogar. “Esto es como The Forest pero en el mar”, quizás estés pensando. ",
    downloadLinks: ["https://www.mediafire.com/file/3q3db74oviufnpu/Stranded.Deep.v0.90.11.zip/file"],
    imgUrl: "https://pivigames.blog/wp-content/uploads/2021/02/Stranded-Deep-Juego-PiviGames.jpg",
    totalSize: "1.5 GB",
    youtubeTrailerUrl: "https://youtu.be/qawXmda9ebY",
  },
  {
    title: "BEAMNG DRIVE V0.24.1.1 PC + ONLINE STEAM",
    description:
      " es un juego de simulador de coches que se encuentra en fase de Acceso Anticipado. La versión completa promete miles de misiones y explorar mundos abiertos con tu vehículo. La versión actual es prácticamente un SAW para coches.",
    downloadLinks: ["https://www.mediafire.com/file/cselc63645vnkz7/BeamNG.Drive.v0.24.1.1-0xdeadc0de.7z/file"],
    imgUrl: "https://pivigames.blog/wp-content/uploads/2017/04/BeamNG-drive-Free-Download.jpeg",
    totalSize: "7 GB",
    youtubeTrailerUrl: "https://youtu.be/7vGYVUCmxeI",
  },
];
