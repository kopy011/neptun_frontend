import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import {
  SharedActionTypes,
  loggedInAction,
  loggedOutAction,
} from './shared.actions';
import { EMPTY, catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActionTypes.login),
      mergeMap((action: any) => {
        return this.userService.login(action.username, action.password).pipe(
          map((token) => {
            if (token) {
              //todo szép alert
              alert('Sikeres bejelentkezés!');
              this.router.navigate(['home']);
            } else {
              alert('Sikertelen bejelentkezés');
            }
            return loggedInAction({ jwtToken: token });
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActionTypes.logout),
      map(() => {
        return loggedOutAction();
      })
    );
  });
}
