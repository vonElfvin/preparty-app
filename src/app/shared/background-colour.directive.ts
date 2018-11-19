import { Directive, ElementRef } from '@angular/core';
import { GameService } from '../games/shared/game.service';
import { Game } from '../games/shared/game.model';
import { Router, Event, NavigationEnd } from '@angular/router';


@Directive({
  selector: '[appBackgroundColour]'
})
export class BackgroundColourDirective {

  accent = "#4fc3f7";

  constructor(
    private gameService: GameService,
    el: ElementRef,
    private router: Router) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        if (event['urlAfterRedirects'] === '/') {
          el.nativeElement.style.backgroundColor = this.accent;
        }
      }
    });

    this.gameService.game.subscribe((game: Game) => {
      console.log(this.router.url);
      if ((typeof game.backgroundColor !== 'undefined') && this.router.url !== '/') {
        el.nativeElement.style.backgroundColor = game.backgroundColor;
      } else {
        el.nativeElement.style.backgroundColor = this.accent;
      }
    });
  }
}

