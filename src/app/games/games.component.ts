import { Component, OnInit } from '@angular/core';
import { Game } from './shared/game.model';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { Router } from '@angular/router';
import { GameService } from './shared/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Observable<Game[]>;

  joinCode: string;

  constructor(private fireauthService: FireauthService,
              private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.games = this.gameService.getGames();
  }

  joinGame() {
    this.fireauthService.loginAnonymously();
  }
}
