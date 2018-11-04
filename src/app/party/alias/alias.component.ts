import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../shared/party.service';
import { Observable } from 'rxjs';
import { Game } from '../../games/shared/game.model';
import { GameService } from '../../games/shared/game.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {

  alias: string;
  joinCode: string;
  gameObservable: Observable<Game>;

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
      this.gameObservable = this.gameService.getGame(party.selectedGame);
    });
  }

  setAlias() {
    this.authService.upsertUserAlias(this.alias);
    this.router.navigate([`lobby/${this.joinCode}`]);
  }
}
