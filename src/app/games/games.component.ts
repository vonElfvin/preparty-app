import { Component, OnInit } from '@angular/core';
import { Game } from './shared/game.model';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { Router } from '@angular/router';

export const TEMP_GAMES: Game[] = [{name: "King's Cup" , image_path: '../../assets/illustrations/kings_cup_logo.svg'},
{name: "Never Have I Ever" , image_path: '../../assets/illustrations/kings_cup_logo.svg'} ]

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Game[] = TEMP_GAMES;
  gameCode: string;

  constructor(private fireAuthenticationService: FireauthService,
              private router: Router) { }

  ngOnInit() {
  }

  joinGame() {
    //Check if code is valid
    //this.fireauth.checkCode(gameCode)
    console.log(this.gameCode);
    this.fireAuthenticationService.loginAnonymously();
    // if (this.fireauth.checkCode(gameCode)) {
    // retrieve game info
    //    this.router.navigate("/gameName/GameCode")
    // }
  }
}
