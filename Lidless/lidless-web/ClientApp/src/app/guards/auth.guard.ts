import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras, UrlTree, Params } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let extras = {
      replaceUrl: false,
      skipLocationChange: true,
      queryParams: {
        redirect: route.routeConfig.path
      } as Params
    } as NavigationExtras;

    if (!this._authService.isLoggedIn)
      this._router.navigate(["login"], extras);

    return this._authService.isLoggedIn;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
