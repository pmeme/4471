import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Breach } from '../../services/models/breach';
import { Account } from '../../services/models/Account.model';
import { Observable, merge } from 'rxjs';
import { PwndService } from '../../services/pwnd.service';
import { AccountService } from '../../services/account.service';
import { map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreachResolver implements Resolve<Breach[]> {
  constructor(
    private _breachService: PwndService,
    private _accountService: AccountService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breach[]> {
    let id = route.paramMap.get('id');

    return this._accountService.getAccount(id).pipe(concatMap((result) => 
      this._breachService.getAccountBreaches(<Account> result.data())));
  }
}

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<firebase.firestore.DocumentSnapshot> {
  constructor(
    private _accountService: AccountService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<firebase.firestore.DocumentSnapshot> {
    let id = route.paramMap.get('id');

    return this._accountService.getAccount(id);
  }
}
