import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-game',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-game.html'
})
export class AddGame implements OnInit {
  newGame = new Game();
  nomAjouteur: string = '';
  types!: Type[];
  newIdType!: number;
  newType!: Type;
  myForm!: FormGroup;
  constructor(private gameService: GameService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.types = this.gameService.listeTypes();
    this.myForm = this.formBuilder.group({
      idGame: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nomGame: ['', [Validators.required, Validators.minLength(3)]],
      prixGame: [0, [Validators.required, Validators.min(0)]],
      dateCreation: ['', Validators.required],
      idType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  addGame() {
    const formValues = this.myForm.value;
    const existingIds = this.gameService.listeGames().map(g => g.idGame);
    if (existingIds.includes(Number(formValues.idGame))) {
      alert("Cet ID existe déjà ! Veuillez en choisir un autre.");
      return;
    }
    const gameToAdd: Game = {
      idGame: formValues.idGame,
      nomGame: formValues.nomGame,
      prixGame: formValues.prixGame,
      dateCreation: formValues.dateCreation,
      type: this.gameService.consulterType(formValues.idType),
      email: formValues.email,
    };
    this.gameService.ajouterGame(gameToAdd);
    this.router.navigate(['games']);
  }
}
