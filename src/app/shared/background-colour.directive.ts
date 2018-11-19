import { Directive, ElementRef } from '@angular/core';
import { GameService } from '../games/shared/game.service';
import { Game } from '../games/shared/game.model';
import {Location} from '@angular/common';


@Directive({
  selector: '[appBackgroundColour]'
})
export class BackgroundColourDirective {

  constructor(
    private gameService: GameService,
    el: ElementRef,
    private location: Location) {
    this.gameService.game.subscribe((game: Game) => {
      if ((typeof game.backgroundColor !== 'undefined') && (this.location.path() !== '')) {
        el.nativeElement.style.backgroundColor = game.backgroundColor;
      }
    });
  }
}

