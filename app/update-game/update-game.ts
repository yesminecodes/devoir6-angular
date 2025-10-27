import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../model/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../model/type.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.html',
  styles: [``],
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class UpdateGame implements OnInit {
  currentGame = new Game();
  types!: Type[];
  myForm!: FormGroup;
  updatedTypeId!: number; 
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {}
  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month, day].join('-');
  }

  ngOnInit(): void {
    this.types = this.gameService.listeTypes();
    this.currentGame = this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']);
    this.updatedTypeId = this.currentGame.type!.idType; 
    
    const formattedDate = this.formatDate(this.currentGame.dateCreation!); 

    this.myForm = this.formBuilder.group({
      idGame: [this.currentGame.idGame, [Validators.required, Validators.pattern("^[0-9]*$")]],
      nomGame: [this.currentGame.nomGame, [Validators.required, Validators.minLength(3)]],
      prixGame: [this.currentGame.prixGame, [Validators.required, Validators.min(0)]],
      
      dateCreation: [formattedDate, Validators.required], 
      
      idType: [this.currentGame.type!.idType, Validators.required], 
      email: [this.currentGame.email, [Validators.required, Validators.email]]
    });
  }

  updateGame() {
    
    const formValues = this.myForm.getRawValue();

    const updatedGame: Game = {
      idGame: formValues.idGame,
      nomGame: formValues.nomGame,
      prixGame: formValues.prixGame,
      dateCreation: formValues.dateCreation,  
      email: formValues.email, 
      type: this.gameService.consulterType(formValues.idType), 
    };
    
    this.gameService.updateGame(updatedGame);
    
    console.log('Game updated successfully:', updatedGame);
    this.router.navigate(['games']);
  }
}