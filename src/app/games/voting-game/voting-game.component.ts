import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-game',
  templateUrl: './voting-game.component.html',
  styleUrls: ['./voting-game.component.scss']
})
export class VotingGameComponent implements OnInit {

  hideMenuButton = false;

  constructor() { }

  ngOnInit() {
  }

}
