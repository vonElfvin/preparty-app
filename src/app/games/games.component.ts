import { Component, OnInit } from '@angular/core';
import { Game } from './shared/game.model';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { Router } from '@angular/router';
import { GameService } from './shared/game.service';
import { Observable } from 'rxjs';
import {PartyService} from '../party/shared/party.service';
import { FeedbackService } from '../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../core/feedback/feedback.model';

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
              private router: Router,
              private partyService: PartyService,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.games = this.gameService.getGames();
  }

  joinGame() {
    this.partyService.checkPartyExists(this.joinCode).subscribe(partyExists => {
      if (partyExists) {
        this.fireauthService.loginAnonymously().then(() => {
          this.router.navigate([`alias/${this.joinCode}`]);
        });
      } else {
        this.feedbackService.message(FeedbackMessage.JoinCodeError, FeedbackType.Error);
      }
    });
  }

  startGame(game: Game) {
    this.partyService.createNewPartyFromGame(game).then(party => {
      this.router.navigate([`alias/${party.joinCode}`]);
    });
  }
}
