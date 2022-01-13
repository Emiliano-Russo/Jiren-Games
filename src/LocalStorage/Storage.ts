import { Game } from "../Models/Game";

class Storage {
  private checkLocalSotrage(nameLocalStorage: string): void {
    if (localStorage.getItem(nameLocalStorage) == null) {
      const gameArrStringify = JSON.stringify([]);
      localStorage.setItem(nameLocalStorage, gameArrStringify);
    }
  }

  private getValueLocalStorage(nameLocalStorage: string): string[] {
    let valueStringlify = localStorage.getItem(nameLocalStorage);
    if (valueStringlify == null) return [];
    const value: string[] = JSON.parse(valueStringlify);
    return value;
  }

  private setValueLocalStorage(nameLocalStorage: any, value: any): void {
    localStorage.setItem(nameLocalStorage, JSON.stringify(value));
  }

  private addGameToPhase(gameName: string, phase: string) {
    this.checkLocalSotrage(phase);
    const gamePhasesArr = this.getValueLocalStorage(phase);
    if (!gamePhasesArr.includes(gameName)) gamePhasesArr.push(gameName);
    this.setValueLocalStorage(phase, gamePhasesArr);
  }

  private removeGameFromPhase(gameName: string, phase: string) {
    this.checkLocalSotrage(phase);
    const gamePhasesArr = this.getValueLocalStorage(phase);
    const index = gamePhasesArr.indexOf(gameName);
    if (index != -1) {
      gamePhasesArr.splice(index, 1);
    }
    this.setValueLocalStorage(phase, gamePhasesArr);
  }

  addGameToDownloads(gameName: string) {
    this.addGameToPhase(gameName, "gamesOnDownload");
  }

  addGameToLibrary(gameName: string) {
    this.addGameToPhase(gameName, "gamesOnLibrary");
  }

  removeGameFromDownloads(name: string) {
    this.removeGameFromPhase(name, "gamesOnDownload");
  }

  removeGameFromLibrary(name: string) {
    this.removeGameFromPhase(name, "gamesOnLibrary");
  }

  getOnDownloadListGames(): string[] {
    this.checkLocalSotrage("gamesOnDownload");
    return this.getValueLocalStorage("gamesOnDownload");
  }

  getOnLibraryListGames(): string[] {
    this.checkLocalSotrage("gamesOnLibrary");
    return this.getValueLocalStorage("gamesOnLibrary");
  }
}

export const Memory = new Storage();
