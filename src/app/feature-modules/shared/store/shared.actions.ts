import { createAction, props } from '@ngrx/store';

export enum SharedActionTypes {
  login = '[Shared] Login',
  loggedIn = '[Shated] Logged in',
  logout = '[Shared] Logout',
  loggedOut = '[Shared] Logged out',
}

export const loginAction = createAction(
  SharedActionTypes.login,
  props<{ username: string; password: string }>()
);

export const loggedInAction = createAction(
  SharedActionTypes.loggedIn,
  props<{ jwtToken?: string }>()
);

export const logoutAction = createAction(SharedActionTypes.logout);

export const loggedOutAction = createAction(SharedActionTypes.loggedOut);
