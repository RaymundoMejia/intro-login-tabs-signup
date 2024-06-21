import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, filter, map, take, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return authService.isAuthenticated.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAuthenticated: boolean) => {
      console.log('isAuthenticated: ', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('Found previous token, automatic login');
        router.navigateByUrl('/tabs', { replaceUrl: true });
        return false;
      } else {
        return true;
      }
    }),
  );
}

export const autoLoginGuard: CanActivateFn = isAuthenticated;