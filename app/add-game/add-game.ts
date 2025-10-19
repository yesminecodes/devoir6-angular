import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-add-game',
  imports: [FormsModule],
  templateUrl: './add-game.html'
})
export class AddGame implements OnInit {
  newGame = new Game();
  types! :  Type[]; 
  newIdType! : number; 
  newType! : Type; 
  constructor(private gameService: GameService,private router :Router,) { }
  ngOnInit(): void {
    this.types = this.gameService.listeTypes(); 
  }
  addGame() {
    // console.log(this.newGame); 
    this.newType = this.gameService.consulterType(this.newIdType);
    this.newGame.type = this.newType;
    this.gameService.ajouterGame(this.newGame);
    this.router.navigate(['games']);
  }
}
