import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { AuthCanLoadGuard } from "./shared/guards/auth-can-load.guard";
import { UserService } from "./services/user/user.service";

const authGuardFunc: CanActivateFn = (activeRoute, activeRouter) => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (!userService.isAuthenticated) {
    router.navigate(['auth']);
  }
  return true;
};

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./pages/tickets/tickets.module').then((m) => m.TicketsModule),
    // canActivate: [AuthGuard],
    canLoad: [AuthCanLoadGuard] 
  },

  {path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
