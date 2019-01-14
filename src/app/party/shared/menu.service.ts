import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuVisibleSub = new BehaviorSubject(false);
  private routerLinkSub = new BehaviorSubject(null);
  private hideAllSub = new BehaviorSubject(false);


  constructor() { }

  setMenuVisibility(value: boolean): Observable<boolean> {
    this.menuVisibleSub.next(value);
    return this.menuVisibleSub.asObservable();
  }

  getMenuVisibility(): Observable<boolean> {
    return this.menuVisibleSub.asObservable();
  }

  setRouterlink(link: string) {
    this.routerLinkSub.next(link);
    return this.routerLinkSub.asObservable();
  }

  getRouterLinkObs(): Observable<string> {
    return this.routerLinkSub.asObservable();
  }

  setHideAll(value: boolean): Observable<boolean> {
    this.hideAllSub.next(value);
    return this.hideAllSub.asObservable();
  }

  getHideAll(): Observable<boolean> {
    return this.hideAllSub.asObservable();
  }


}
