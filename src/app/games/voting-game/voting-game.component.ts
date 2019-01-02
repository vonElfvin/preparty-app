import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartyService} from '../../party/shared/party.service';
import {Party} from '../../party/shared/party';
import {Observable, Subscription} from 'rxjs';
import {VotingGameInstanceService} from './shared/voting-game-instance.service';
import {Vote, VotingGameInstance, VotingGameQuestion} from './shared/voting-game';

@Component({
  selector: 'app-voting-game',
  templateUrl: './voting-game.component.html',
  styleUrls: ['./voting-game.component.scss']
})
export class VotingGameComponent implements OnInit, OnDestroy {

  hideMenuButton = false;
  partyObs: Observable<Party>;
  selectedMemberId: string;
  gameInstance: VotingGameInstance;
  currentQuestion: VotingGameQuestion;

  party: Party;

  partySub: Subscription;
  gameInstanceSub: Subscription;

  constructor(private partyService: PartyService, private votingGameInstanceService: VotingGameInstanceService) { }

  ngOnInit() {
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
    });
    this.gameInstanceSub = this.votingGameInstanceService.getGameInstance().subscribe(gameInstance => {
      console.log(gameInstance);
      if (gameInstance) {
        this.gameInstance = gameInstance;
        this.currentQuestion = gameInstance.currentQuestion;
      } else {
        this.votingGameInstanceService.createGameInstance();
      }
    });
  }

  selectMember(id: string) {
    // Deselect member if pressed again
    if (this.selectedMemberId === id) {
      this.selectedMemberId = null;
    } else {
      // Else select the clicked member
      this.selectedMemberId = id;
    }
    const vote = <Vote> {
      questionId: this.gameInstance.currentQuestion.id,
      votedOnId: id
    };
    this.votingGameInstanceService.sendVote(vote, this.gameInstance.id);

  }

  setNextQuestion() {

  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
    this.gameInstanceSub.unsubscribe();
  }
}
