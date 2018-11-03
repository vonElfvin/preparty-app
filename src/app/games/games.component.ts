import { Component, OnInit } from '@angular/core';

export const GAMES = ["King's Cup", "Never Have I Ever"];

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: String[] = GAMES;

  constructor() { }

  ngOnInit() {
  }

  joinGame() {
  }

}
