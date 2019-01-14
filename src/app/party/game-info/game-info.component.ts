import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../games/shared/game.service';
import {Observable} from 'rxjs';
import {Game} from '../../games/shared/game.model';

import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  gameId: string;

  gameObs: Observable<Game>;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.setMenuVisibility(false);
    this.menuService.setRouterlink(null);
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameObs = this.gameService.getGame(this.gameId);
  }

}
