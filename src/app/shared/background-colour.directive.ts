import { Directive, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../party/shared/party.service';
import { GameService } from '../games/shared/game.service';
import { Game } from '../games/shared/game.model';

@Directive({
  selector: '[appBackgroundColour]'
})
export class BackgroundColourDirective {

  alias: string;
  joinCode: string;
  backgroundColor: string;

  constructor(
    private route: ActivatedRoute,
    private partyService: PartyService,
    private gameService: GameService,
    el: ElementRef) {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
      this.gameService.getGame(party.selectedGame).subscribe((game: Game) => {
        this.backgroundColor = game.backgroundColor;
        console.log(game.backgroundColor);
        el.nativeElement.style.backgroundColor = game.backgroundColor;
      });
    });
  }
}

