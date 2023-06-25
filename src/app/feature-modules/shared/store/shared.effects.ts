import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import {
  SharedActionTypes,
  jwtTokenDecodedAction,
  loggedInAction,
  loggedOutAction,
} from './shared.actions';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

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

  decodeJwtToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActionTypes.decodeJwtToken),
      map((action: any) => {
        return jwtTokenDecodedAction({ userInfo: jwt_decode(action.jwtToken) });
      })
    );
  });
}
