import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../games/shared/game.service';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../../games/shared/game.model';
import {Party} from '../shared/party';
import {PartyService} from '../shared/party.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnDestroy {

  gameId: string;

  gameObs: Observable<Game>;

  joinCode: string;

  image_path: string;

  gameSub: Subscription;
  partySub: Subscription;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private location: Location,
              private partyService: PartyService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameObs = this.gameService.getGame(this.gameId);
    this.gameSub = this.gameObs.subscribe(data => {
      this.image_path = data.image_path;
    });

    this.partySub = this.partyService.party.subscribe((party: Party) => {
      this.joinCode = party.joinCode;
    });
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
    this.gameSub.unsubscribe();
  }

}
