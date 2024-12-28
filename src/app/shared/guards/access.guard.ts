import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAccessService } from "../../services/user-access/user-access.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivateChild {

  constructor(private userAccessService: UserAccessService) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routerFullPath = state.url;
    return this.userAccessService.canRead(routerFullPath);
  }

}
