import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter-pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-recherche-par-nom',
  imports: [DatePipe, FormsModule,SearchFilterPipe,CommonModule],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {
  nomGame!: string;
  games!: Game[];
  allgames!: Game[];
  searchTerm!: string;
  IdType!: number;
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.listeGames1().subscribe(games => {
      console.log(games);
      this.games = games;
    })
  };
  onKeyUp(filterText: string) {
    this.games = this.allgames.filter(item =>
      item.nomGame?.toLowerCase().includes(filterText));
  }
}
