import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private _Authservice: AuthService,
    // private _snackbar: SnackbarService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userRoleLS = this._Authservice.getuserRole();
    let UserRoleRoute = route.data['userRole'];
    console.log(userRoleLS);
    console.log(UserRoleRoute);
    if (UserRoleRoute.includes(userRoleLS)) {
      return true;
    } else {
      // this._snackbar.opensanckbar('You can not Access');
      return false;
    }
  }
  
  
}
