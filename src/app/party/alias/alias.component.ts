import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../shared/party.service';
import { Observable } from 'rxjs';
import { Game } from '../../games/shared/game.model';
import { GameService } from '../../games/shared/game.service';
import { AuthService } from '../../core/auth/auth.service';
import { Party } from '../shared/party';
import { FireauthService } from '../../core/firebase/fireauth/fireauth.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private partyService: PartyService,
    private gameService: GameService,
    private fireauthService: FireauthService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
      this.party = party;
      this.gameObservable = this.gameService.getGame(this.party.selectedGame);
    });
  }

  setAlias() {
    this.fireauthService.loginAnonymously().then(() => {
      this.authService.upsertUserAlias(this.alias);
      this.partyService.addUserToParty(this.party);
      this.router.navigate([`lobby/${this.joinCode}`]);
    });
  }
}
