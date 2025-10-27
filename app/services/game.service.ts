import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Type } from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[]; //un tableau de Game
  type!: Type[];
  gamesRecherche!: Game[];

  constructor() {
    this.type = [{ idType: 1, nomType: "RPG" },
    { idType: 2, nomType: "MOBA" },
    { idType: 3, nomType: "Survival Horror" },
    { idType: 4, nomType: "FPS" },
    { idType: 5, nomType: "Sandbox" },
    { idType: 6, nomType: "Battle Royale" },
    { idType: 7, nomType: "Metroidvania" }
    ];
    this.games = [
      { idGame: 1, nomGame: "League Of Legends", prixGame: 0, dateCreation: new Date("2009-10-27"), type: { idType: 2, nomType: "MOBA" }, email:"-"},
      { idGame: 2, nomGame: "Elden Ring", prixGame: 59.99, dateCreation: new Date("2022-02-25"), type: { idType: 1, nomType: "RPG" },email:"-"},
      { idGame: 3, nomGame: "Resident Evil 7: Biohazard", prixGame: 19.99, dateCreation: new Date("2017-01-24"), type: { idType: 3, nomType: "Survival Horror" },email:"-"},
      { idGame: 4, nomGame: "Valorant", prixGame: 0, dateCreation: new Date("2020-06-02"), type: { idType: 4, nomType: "FPS" },email:"-"},
      { idGame: 5, nomGame: "Minecraft", prixGame: 26.95, dateCreation: new Date("2011-11-18"), type: { idType: 5, nomType: "Sandbox" },email:"-"},
      { idGame: 6, nomGame: "Fortnite", prixGame: 0, dateCreation: new Date("2017-07-21"), type: { idType: 6, nomType: "Battle Royale" },email:"-"},
      { idGame: 7, nomGame: "Genshin Impact", prixGame: 0, dateCreation: new Date("2020-09-28"), type: { idType: 1, nomType: "RPG" },email:"-"},
      { idGame: 8, nomGame: "Dark Souls III", prixGame: 39.99, dateCreation: new Date("2016-04-12"), type: { idType: 1, nomType: "RPG" },email:"-"},
      { idGame: 9, nomGame: "Overwatch 2", prixGame: 0, dateCreation: new Date("2022-10-04"), type: { idType: 4, nomType: "FPS" },email:"-"},
      { idGame: 10, nomGame: "Hollow Knight", prixGame: 14.99, dateCreation: new Date("2017-02-24"), type: { idType: 7, nomType: "Metroidvania" } ,email:"-"}
    ];
  }

  listeGames(): Game[] {
    return this.games;
  }

  ajouterGame(game: Game) {
    this.games.push(game);
  }

  supprimerGame(game: Game) {
    // This method is also correct because it uses the exact object reference
    const index = this.games.indexOf(game, 0); 
    if (index > -1) {
      this.games.splice(index, 1);
    }
  }
  
  // Note: It's generally better practice not to store temporary state like 'game!' in the service.
  game!: Game; 
  consulterGame(id: number): Game {
    // The find method is correct here.
    this.game = this.games.find(g => g.idGame == id)!;
    return this.game;
  }
  
  /**
   * CORRECTED METHOD: Updates the game in the array by finding its index based on ID.
   * @param g The updated Game object.
   */
  updateGame(g: Game) {
    // FIX: Use findIndex to locate the array position using the unique ID.
    const index = this.games.findIndex((game) => game.idGame == g.idGame);

    if (index > -1) {
      // FIX: Directly replace the element at the found index.
      this.games[index] = g;
      console.log('Game updated successfully in service array:', g);
    } else {
      console.error('Error: Could not find game with ID', g.idGame, 'to update.');
    }
  }
  
  listeTypes(): Type[] {
    return this.type;
  }
  
  consulterType(id: number): Type {
    return this.type.find(type => type.idType == id)!;
  }
  
  rechercherParType(idType: number): Game[] {
    this.gamesRecherche = [];
    this.games.forEach((cur, index) => {
      if (idType == cur.type?.idType) {
        console.log("cur " + cur);
        this.gamesRecherche.push(cur);
      }
    });
    return this.gamesRecherche;
  }
}