import { Component, OnInit, Input } from '@angular/core';
import { ThisOrThatGameInstanceService } from '../shared/this-or-that-game-instance.service';

@Component({
  selector: 'app-statement-card',
  templateUrl: './statement-card.component.html',
  styleUrls: ['./statement-card.component.scss']
})
export class StatementCardComponent implements OnInit {

  @Input() option: string;
  @Input() backgroundColor: string;
  @Input() choice: boolean;

  turned = false;
  viewResults = false;

  constructor(private thisOrThatGameInstanceService: ThisOrThatGameInstanceService) { }

  ngOnInit() {

    this.thisOrThatGameInstanceService.getGameInstance().subscribe(gameInstance => {
      if (gameInstance) {
        this.viewResults = gameInstance.viewResults;
      }
    });
    this.thisOrThatGameInstanceService.flip.subscribe(flip => {
      this.turned = flip;
    }
    );
  }

  turn() {
    if (this.viewResults) {
      this.turned = !this.turned;
    }
  }
}
