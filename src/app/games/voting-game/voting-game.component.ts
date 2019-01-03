import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartyService} from '../../party/shared/party.service';
import {Party} from '../../party/shared/party';
import {Observable, Subscription} from 'rxjs';
import {VotingGameInstanceService} from './shared/voting-game-instance.service';
import {Vote, VotingGameInstance, VotingGameQuestion} from './shared/voting-game';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/user.model';

@Component({
  selector: 'app-voting-game',
  templateUrl: './voting-game.component.html',
  styleUrls: ['./voting-game.component.scss']
})
export class VotingGameComponent implements OnInit, OnDestroy {

  hideMenuButton = false;
  selectedMemberId: string;
  gameInstance: VotingGameInstance;
  currentQuestion: VotingGameQuestion;
  uid: string;
  isGameLeader: boolean;
  party: Party;
  user: User;

  votingResults = [];

  partySub: Subscription;
  gameInstanceSub: Subscription;
  private userSub: Subscription;

  constructor(private partyService: PartyService, private votingGameInstanceService: VotingGameInstanceService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.uid = user.id;
      this.user = user;
      if (this.party) {
        this.isGameLeader = this.party.leader === this.uid;
      }
    });
    console.log(this.uid);

    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
      if (party) {
        this.isGameLeader = party.leader === this.uid;
      }
    });
    this.gameInstanceSub = this.votingGameInstanceService.getGameInstance().subscribe(gameInstance => {
      console.log(gameInstance);
      if (gameInstance) {
        this.gameInstance = gameInstance;
        this.setVotedOId();
        this.currentQuestion = gameInstance.currentQuestion;
        if (this.party && gameInstance.currentVotes.length === this.party.members.length && this.isGameLeader) {
          this.setViewIngTrue();
        }
        if (gameInstance.viewResults) {
          this.setVotingResults();
        }

      } else {
        this.votingGameInstanceService.createGameInstance();
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

    this.votingGameInstanceService.updateGameInstance(this.gameInstance);

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
      this.votingGameInstanceService.removeVote(vote, this.gameInstance.id);
    } else {
      // Else select the clicked member
      this.selectedMemberId = id;
      this.votingGameInstanceService.sendVote(vote, this.gameInstance.id);
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
    this.setVotingResults();
    this.votingGameInstanceService.setViewing(this.gameInstance.id, true);
  }

  private getOccurrence(array: Array<Vote>, value) {
    return array.filter((v) => (v.votedOnId === value)).length;
  }
  private setVotingResults() {
    this.votingResults = [];
    for (const member of this.party.members) {
      this.votingResults.push({name: member.alias, votes: this.getOccurrence(this.gameInstance.currentVotes, member.id)});
    }

  }
}
