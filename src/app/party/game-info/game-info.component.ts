import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../games/shared/game.service';
import {Observable} from 'rxjs';
import {Game} from '../../games/shared/game.model';
import {Party} from '../shared/party';
import {PartyService} from '../shared/party.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  gameId: string;

  gameObs: Observable<Game>;

  gameCode: string;

  image_path: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gameService: GameService,
              private location: Location,
              private partyService: PartyService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameObs = this.gameService.getGame(this.gameId);
    this.gameObs.subscribe(data => {
      this.image_path = data.image_path;
    });

    this.partyService.party.subscribe((party: Party) => {
      this.gameCode = party.joinCode;
    });
  }

  navigateBack() {
    this.location.back();
  }

}
