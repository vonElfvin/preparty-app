import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ThisOrThatGameInstance, ThisOrThatVote, ThisOrThatQuestion, VoteValue} from './shared/thisOrThat';
import {ThisOrThatGameInstanceService} from './shared/this-or-that-game-instance.service';
import {PartyService} from '../../party/shared/party.service';
import {AuthService} from '../../core/auth/auth.service';
import { Subscription, Observable, of } from 'rxjs';
import {Party} from '../../party/shared/party';
import {User} from '../../core/auth/user.model';
import {GameService} from '../shared/game.service';
import {map, take} from 'rxjs/operators';
import {MenuService} from '../../party/shared/menu.service';
import {ClockComponent} from './clock/clock.component';

@Component({
  selector: 'app-this-or-that',
  templateUrl: './this-or-that.component.html',
  styleUrls: ['./this-or-that.component.scss']
})
export class ThisOrThatComponent implements OnInit, OnDestroy {

  selectedStatement: VoteValue;
  gameInstance: ThisOrThatGameInstance;
  currentQuestion: ThisOrThatQuestion;
  isGameLeader: Observable<boolean> = of(true);
  timerObs: Observable<number>;
  party: Party;
  user: User;

  duringVote: boolean;

  voteValue = VoteValue;

  votingResults = [];

  partySub: Subscription;
  gameInstanceSub: Subscription;
  private userSub: Subscription;

  timer = 10;

  @ViewChild(ClockComponent)
    clockComponent: ClockComponent;


  next = false;
  colordis = '#5d96c1';
  colordat = '#b34747';

  constructor(private partyService: PartyService, private thisOrThatGameInstanceService: ThisOrThatGameInstanceService,
              private authService: AuthService, private gameService: GameService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.setMenuVisibility(true);
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
    });
    this.timerObs = this.gameService.game.pipe(take(1), map(game => game.timer));

    this.isGameLeader = this.partyService.isGameLeaderObservable;

    this.gameInstanceSub = this.thisOrThatGameInstanceService.getGameInstance().subscribe(gameInstance => {
      console.log(gameInstance);
      if (gameInstance) {
        this.gameInstance = gameInstance;
        this.setVotedOn();
        this.currentQuestion = gameInstance.currentQuestion;
        if (this.party && gameInstance.currentVotes.length === this.party.members.length && this.isGameLeader) {
          this.setViewIngResultsTrue();
        }
        if (this.gameInstance.viewResults) {
          this.setVotingResults();
        }
      } else {
        this.thisOrThatGameInstanceService.createGameInstance();
      }
    });
  }

  setVotedOn() {
    if (this.duringVote) { return; }
    let voted = false;
    for (const vote of this.gameInstance.currentVotes) {
      if (vote.voterId === this.user.id) {
        voted = true;
        this.selectedStatement = vote.votedOn;
      }
    }
    if (!voted) {
      this.selectedStatement = null;
    }
  }

  setNextQuestion() {
    // Remove current votes
    this.gameInstance.oldVotes.concat(this.gameInstance.currentVotes);
    this.gameInstance.currentVotes = [];

    // Select manual question with 70% probability
    if (this.gameInstance.manualQuestions.length > 0 && Math.floor(Math.random() * Math.floor(100)) <= 70) {
      this.gameInstance.currentQuestion = this.gameInstance.manualQuestions.shift();
    } else {
      let currentQuestion: ThisOrThatQuestion;
      if  (this.gameInstance.genericQuestions.length > 0) {
        currentQuestion = this.gameInstance.genericQuestions.shift();
      }
      this.gameInstance.currentQuestion = currentQuestion;
      this.gameInstance.seenQuestions.push(currentQuestion.index);
      if (this.gameInstance.seenQuestions.length === 192) {
        this.gameInstance.seenQuestions = [];
      }
    }

    // Stop viewing results
    this.gameInstance.viewResults = false;

    this.thisOrThatGameInstanceService.updateGameInstance(this.gameInstance);

  }

  selectStatement(voteValue: any) {
    const vote = <ThisOrThatVote> {
      questionId: this.gameInstance.currentQuestion.id,
      votedOn: voteValue,
      voterId: this.user.id
    };

    // Deselect member if pressed again

    if (this.selectedStatement === voteValue) {
      this.selectedStatement = null;
      this.thisOrThatGameInstanceService.removeVote(vote, this.gameInstance.id);
    } else {
      // Else select the clicked member
      if (this.selectedStatement) {
        const oldVote = <ThisOrThatVote> {
          questionId: this.gameInstance.currentQuestion.id,
          votedOn: this.selectedStatement,
          voterId: this.user.id
        };
        this.selectedStatement = voteValue;
        console.log(this.selectedStatement);
        this.duringVote = true;
        this.thisOrThatGameInstanceService.removeVote(oldVote, this.gameInstance.id).then(() => {
          console.log(this.selectedStatement);
          this.duringVote = false;
          this.thisOrThatGameInstanceService.sendVote(vote, this.gameInstance.id);
        });
      } else {
        this.thisOrThatGameInstanceService.sendVote(vote, this.gameInstance.id);
      }
    }
  }




  setViewingFalse() {
    this.setNextQuestion();
  }

  setViewIngResultsTrue() {
    this.thisOrThatGameInstanceService.setViewing(this.gameInstance.id, true);
  }

  private getOccurrence(array: Array<ThisOrThatVote>, value) {
    return array.filter((v) => (v.votedOn === value)).length;
  }

  private setVotingResults() {
    this.votingResults = [];

  }

  timerComplete() {
    this.clockComponent.startCount(this.timer);
    this.thisOrThatGameInstanceService.setViewing(this.gameInstance.id, true);
  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
    this.gameInstanceSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
