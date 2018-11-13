import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../games/shared/game.service';
import {Observable} from 'rxjs';
import {Game} from '../../games/shared/game.model';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  gameId: string;

  gameObs: Observable<Game>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gameService: GameService ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['id'];
    this.gameObs = this.gameService.getGame(this.gameId);

  }

}
