import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { isLoggedIn } from 'src/app/feature-modules/shared/store/shared.selectors';

export function authGuard(): CanActivateFn {
  return () => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(isLoggedIn).pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        router.navigate(['/login']);
        return false;
      })
    );
  };
}
