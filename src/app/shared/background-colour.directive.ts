import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { GameService } from '../games/shared/game.service';
import { Game } from '../games/shared/game.model';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../core/spinner/spinner.service';


@Directive({
  selector: '[appBackgroundColour]'
})
export class BackgroundColourDirective implements OnDestroy {

  accent = '#4fc3f7';
  subscription: Subscription;

  constructor(
    private gameService: GameService,
    el: ElementRef,
    private router: Router,
    private spinnerService: SpinnerService) {

    this.subscription = this.gameService.game.subscribe((game: Game) => {
      if (game) {
        if ((typeof game.backgroundColor !== 'undefined') && this.router.url !== '/') {
          el.nativeElement.style.backgroundColor = game.backgroundColor;
        } else {
          el.nativeElement.style.backgroundColor = this.accent;
        }

        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
            if (event['urlAfterRedirects'] === '/') {
              el.nativeElement.style.backgroundColor = this.accent;
            } else {
              el.nativeElement.style.backgroundColor = game.backgroundColor;
            }
          }
        });
      }
    });

    this.spinnerService.loader.subscribe((loading: boolean) => {
      if (loading === true) {
        el.nativeElement.style.filter = 'brightness(50%)';
      } else {
        el.nativeElement.style.filter = 'brightness(100%)';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

