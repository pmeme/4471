import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Breach } from '../../services/models/breach';
import { Observable } from 'rxjs';
import { PwndService } from '../../services/pwnd.service';

@Injectable({
  providedIn: 'root'
})
export class ViewBreachResolver implements Resolve<Breach[]> {
  constructor(
    private _breachService: PwndService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breach[]> {
    let id = route.paramMap.get('id');

    return this._breachService.getAccountBreaches(id);
  }
}
