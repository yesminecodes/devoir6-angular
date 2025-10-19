import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../model/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-game',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-game.html',
  styles: ``
})
export class UpdateGame {
  currentGame = new Game();

  types! : Type[]; 
  updatedTypeId! : number;
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private gameService: GameService) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params.id); 
    this.types = this.gameService.listeTypes();
    this.currentGame = this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']);
    //this.updatedTypeId!=this.currentGame.type?.idType; 
    this.updatedTypeId=this.currentGame.type!.idType; 
    console.log("+++++++++++++++++ "+ this.updatedTypeId);
  }
    updateGame() 
  { //console.log(this.currentGame); 
    this.currentGame.type = this.gameService.consulterType(this.updatedTypeId);
    this.gameService.updateGame(this.currentGame); 
    this.router.navigate(['games']);
  }
}
