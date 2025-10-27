import { Routes } from '@angular/router';
import { Games } from './games/games';
import { AddGame } from './add-game/add-game';
import { UpdateGame } from './update-game/update-game';
import { RechercheParType } from './recherche-par-type/recherche-par-type';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';

export const routes: Routes = [
  { path: "games", component: Games, runGuardsAndResolvers: 'always' },
  { path: "add-game", component: AddGame },
  { path: "", redirectTo: "games", pathMatch: "full" },
  { path: "updateGame/:id", component: UpdateGame },
  { path: "rechercheParType", component: RechercheParType },
  { path: "rechercheParNom", component: RechercheParNom },
];

