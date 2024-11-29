import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, Observable, of, switchMap } from 'rxjs';
import { UserService } from "../../services/user/user.service";
import { UserAccessService } from "../../services/user-access/user-access.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private userAccessService: UserAccessService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return this.userAccessService.getUserRules().pipe(
        delay(200),
        switchMap((roles) => {
          if(Array.isArray(roles) && roles.length > 0) {
            this.userAccessService.initAccess(roles);
            return of(true);
          } else {
            return of(false);
          }
        })
      );
    }
  }
}
