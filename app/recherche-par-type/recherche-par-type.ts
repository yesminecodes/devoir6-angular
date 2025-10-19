import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Type } from '../model/type.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-type',
  imports: [DatePipe,FormsModule,RouterLink],
  templateUrl: './recherche-par-type.html',
  styles: ``
})
export class RechercheParType implements OnInit {
  games: Game[]=[];
  IdType!: number;
  types!: Type[];
  allGames!: Game[];
  searchTerm!: string;
  constructor(private gameService: GameService) {

  }
  ngOnInit(): void {
    this.games = [];
    this.types = this.gameService.listeTypes();
  }
  onChange() {
    console.log(this.IdType);
    this.games = this.gameService.rechercherParType(this.IdType);
  }
  supprimerGame(g: Game) {
    //console.log(g);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.gameService.supprimerGame(g);
    this.games = this.gameService.rechercherParType(this.IdType);
  }
  onKeyUp(filterText : string){
this.games = this.allGames.filter(item => item.nomGame?.toLowerCase().includes(filterText));
  }}
