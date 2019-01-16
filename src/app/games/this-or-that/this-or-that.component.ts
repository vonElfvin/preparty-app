import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThisOrThatGameInstance, Vote, VotingGameQuestion} from './shared/thisOrThat';
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

  selectedMemberId: string;
  gameInstance: ThisOrThatGameInstance;
  currentQuestion: VotingGameQuestion;
  uid: string;
  isGameLeader: Observable<boolean> = of(true);
  party: Party;
  user: User;

  votingResults = [];

  partySub: Subscription;
  gameInstanceSub: Subscription;
  private userSub: Subscription;
  private labels = [];
  private data = [];

  next = false;
  dis = 'dis';
  colordis = 'red';
  dat = 'dat';
  colordat = 'blue';

  constructor(private partyService: PartyService, private thisOrThatGameInstanceService: ThisOrThatGameInstanceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.uid = user.id;
      this.user = user;
      if (this.party) {
        //this.isGameLeader = this.party.leader === this.uid;
      }
    });
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
      if (party) {
        //this.isGameLeader = party.leader === this.uid;
      }
    });
    this.gameInstanceSub = this.thisOrThatGameInstanceService.getGameInstance().subscribe(gameInstance => {
      console.log(gameInstance);
      if (gameInstance) {
        this.gameInstance = gameInstance;
        this.setVotedOId();
        this.currentQuestion = gameInstance.currentQuestion;
        if (this.party && gameInstance.currentVotes.length === this.party.members.length && this.isGameLeader) {
          this.setViewIngTrue();
        }
        if (this.gameInstance.viewResults) {
          this.setVotingResults();
        }
      } else {
        this.thisOrThatGameInstanceService.createGameInstance();
      }
    });
  }

  setVotedOId() {
    console.log(this.uid);
    let voted = false;
    for (const vote of this.gameInstance.currentVotes) {
      if (vote.voterId === this.uid) {
        voted = true;
        this.selectedMemberId = vote.votedOnId;
      }
    }
    if (!voted) {
      this.selectedMemberId = null;
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
      const currentQuestion: VotingGameQuestion = this.gameInstance.genericQuestions.shift();
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

  selectMember(id: string) {
    const vote = <Vote> {
      questionId: this.gameInstance.currentQuestion.id,
      votedOnId: id,
      voterId: this.uid
    };

    // Deselect member if pressed again
    if (this.selectedMemberId === id) {
      this.selectedMemberId = null;
      this.thisOrThatGameInstanceService.removeVote(vote, this.gameInstance.id);
    } else {
      // Else select the clicked member
      this.selectedMemberId = id;
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

  setViewIngTrue() {
    this.thisOrThatGameInstanceService.setViewing(this.gameInstance.id, true);
  }

  private getOccurrence(array: Array<Vote>, value) {
    return array.filter((v) => (v.votedOnId === value)).length;
  }

  private setVotingResults() {
    this.votingResults = [];
    this.labels = [];
    this.data = [];
    const temp = [];
    for (const member of this.party.members) {
      temp.push(this.getOccurrence(this.gameInstance.currentVotes, member.id));
      this.labels.push(member.alias);
      this.votingResults.push({name: member.alias, votes: this.getOccurrence(this.gameInstance.currentVotes, member.id)});
    }
    this.data.push({data: temp, label: 'Votes'});
  }

  nextQuestion() {
    this.next = true;
  }

}
