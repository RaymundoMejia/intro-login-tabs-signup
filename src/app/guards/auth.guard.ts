import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, filter, take, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return authService.isAuthenticated.pipe(
    filter((val) => val !== null), 
    take(1),
    tap((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    }),
  );
}

export const authGuard: CanActivateFn = isAuthenticated;
export const canMatch: CanMatchFn = isAuthenticated;