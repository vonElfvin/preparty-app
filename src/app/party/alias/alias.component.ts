import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../shared/party.service';
import { Observable } from 'rxjs';
import { Game } from '../../games/shared/game.model';
import { GameService } from '../../games/shared/game.service';
import { AuthService } from '../../core/auth/auth.service';
import { Party } from '../shared/party';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {

  alias: string;
  joinCode: string;
  gameObservable: Observable<Game>;
  party: Party;
  gameCodeText: string;
  startButtonText = 'Join Game';
  isLeader = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private partyService: PartyService,
    private gameService: GameService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
      this.party = party;
      this.setGameCodeText();
      this.gameObservable = this.gameService.getGame(this.party.selectedGame);
    });
  }

  setAlias() {
    this.authService.loginAnonymously().then(() => {
      console.log('hej');
      this.authService.upsertUserAlias(this.alias);
      this.partyService.addUserToParty(this.party);
      this.router.navigate([`lobby/${this.joinCode}`]);
    });
  }

  setGameCodeText() {
    if (this.partyService.isGameLeader(this.party)) {
      this.isLeader = true;
      this.gameCodeText = 'Game code will be generated';
      this.startButtonText = 'Create Game';
    } else {
      this.isLeader = false;
      this.gameCodeText = this.party.joinCode;
      this.startButtonText = 'Join Game';

    }



  }
}
