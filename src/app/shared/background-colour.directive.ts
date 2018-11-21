import { Directive, ElementRef, OnDestroy } from '@angular/core';
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

    this.gameService.game.subscribe((game: Game) => {

      if ((typeof game.backgroundColor !== 'undefined') && this.router.url !== '/') {
        el.nativeElement.style.backgroundColor = game.backgroundColor;
      } else {
        el.nativeElement.style.backgroundColor = this.accent;
      }

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          console.log(event['urlAfterRedirects']);
          if (event['urlAfterRedirects'] === '/') {
            console.log("accent-nav");
            el.nativeElement.style.backgroundColor = this.accent;
          } else {
            el.nativeElement.style.backgroundColor = game.backgroundColor;
          }
        }
      });
    });
  }
}

