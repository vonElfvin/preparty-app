import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {

  alias: string;
  gameName: string;
  joinCode: string;
  admin = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setAlias() {
    // User.name = this.alias
    console.log(this.alias);
    // this.router.navigateByUrl('/' + this.gameName + '/' + this.joinCode);
  }
}
