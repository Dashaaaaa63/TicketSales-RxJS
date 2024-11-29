import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { delay, Observable, of, switchMap } from 'rxjs';
import { UserService } from "../../services/user/user.service";
import { UserAccessService } from "../../services/user-access/user-access.service";

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

  constructor(private userService: UserService, private router: Router, private userAccessService: UserAccessService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return this.userAccessService.getUserRules().pipe(
        delay(2020),
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
