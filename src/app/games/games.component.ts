import { Component, OnInit } from '@angular/core';
import { Game } from './shared/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor() { }

  ngOnInit() {
  }

  joinGame() {
  }
}
