import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThisOrThatGameInstance, ThisOrThatVote, ThisOrThatQuestion, VoteValue} from './shared/thisOrThat';
import {ThisOrThatGameInstanceService} from './shared/this-or-that-game-instance.service';
import {PartyService} from '../../party/shared/party.service';
import {AuthService} from '../../core/auth/auth.service';
import { Subscription, Observable, of } from 'rxjs';
import {Party} from '../../party/shared/party';
import {User} from '../../core/auth/user.model';

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
  party: Party;
  user: User;

  voteValue = VoteValue;

  votingResults = [];

  partySub: Subscription;
  gameInstanceSub: Subscription;
  private userSub: Subscription;


  next = false;
  dis = 'The quick brown fox jumps over the lazy dog';
  colordis = '#5d96c1';
  dat = 'The quick brown fox jumps over the lazy dog';
  colordat = '#b34747';

  constructor(private partyService: PartyService, private thisOrThatGameInstanceService: ThisOrThatGameInstanceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
    });

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
      const currentQuestion: ThisOrThatQuestion = this.gameInstance.genericQuestions.shift();
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
      this.selectedStatement = voteValue;
      this.thisOrThatGameInstanceService.sendVote(vote, this.gameInstance.id);
    }
  }


  ngOnDestroy(): void {
    this.partySub.unsubscribe();
    this.gameInstanceSub.unsubscribe();
    this.userSub.unsubscribe();
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

  nextQuestion() {
    this.next = true;
  }

}
