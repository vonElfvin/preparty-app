import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Party} from '../shared/party';
import {Game} from '../../games/shared/game.model';
import {PartyService} from '../shared/party.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GameInstanceService} from '../../games/shared/game-instance.service';
import {NhieGameInstanceService} from '../../games/nhie/shared/nhie-game-instance.service';
import {GameService} from '../../games/shared/game.service';
import {AuthService} from '../../core/auth/auth.service';
import {filter, take, tap} from 'rxjs/operators';
import {MenuService} from '../shared/menu.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, OnDestroy {

  party: Observable<Party>;
  gameObservable: Observable<Game>;
  isLoggedIn: Observable<boolean>;
  isGameLeader: Observable<boolean>;
  joinCode: number;

  // Config variables for the menu
  showMenu: boolean;
  backRouterLink: string;
  hideAll: boolean;

  menuSub: Subscription;
  linkSub: Subscription;
  hideAllSub: Subscription;

  constructor(
    private partyService: PartyService,
    private router: Router,
    private gameInstanceService: GameInstanceService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService,
    private location: Location,
    private menuService: MenuService
  ) {  }

  ngOnInit() {
    this.menuSub = this.menuService.getMenuVisibility().subscribe(res => {
      this.showMenu = res;
      console.log(res);
    });
    this.linkSub = this.menuService.getRouterLinkObs().subscribe(link => {
      this.backRouterLink = link;
    });

    this.hideAllSub = this.menuService.getHideAll().subscribe(hideAll => {
      this.hideAll = hideAll;
    });

    this.party = this.partyService.party;
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    this.isLoggedIn = this.authService.isLoggedInObservable;
    this.gameObservable = this.gameService.game;
  }


  onBackButtonClick() {
    if (this.backRouterLink) {
      this.router.navigate([this.backRouterLink]);
    } else {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    if (this.menuSub) {
      this.menuSub.unsubscribe();
    }
    if (this.linkSub) {
      this.linkSub.unsubscribe();
    }
    if (this.hideAllSub) {
      this.hideAllSub.unsubscribe();
    }
  }

}
