import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../games/shared/game.model';
import {GameService} from '../../games/shared/game.service';
import {Router} from '@angular/router';
import {PartyService} from '../shared/party.service';
import {FeedbackService} from '../../core/feedback/feedback.service';
import {AuthService} from '../../core/auth/auth.service';
import {take} from 'rxjs/operators';
import {FeedbackMessage, FeedbackType} from '../../core/feedback/feedback.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Observable<Game[]>;

  joinCode: number;

  constructor(
    private gameService: GameService,
    private router: Router,
    private partyService: PartyService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.games = this.gameService.getGames();
  }

  joinGame() {
    this.partyService.getPartyByJoinCode(this.joinCode).pipe(
      take(1)
    ).subscribe(party => {
      if (party) {
        this.authService.loginAnonymously().then(() => {
          this.authService.joinParty(party).then(() => {
            this.feedbackService.message(FeedbackMessage.JoinCodeSuccess, FeedbackType.Primary);
            this.router.navigate([`alias/${this.joinCode}`]);
          });
        });
      } else {
        this.feedbackService.message(FeedbackMessage.JoinCodeError, FeedbackType.Error);
      }
    });
  }

  selectGame(game: Game) {
    this.partyService.createNewPartyFromGame(game).then(party => {
      this.router.navigate([`alias/${party.joinCode}`]);
    });
  }
}
