import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/app/models/User';

export enum SharedActionTypes {
  login = '[Shared] Login',
  loggedIn = '[Shated] Logged in',
  logout = '[Shared] Logout',
  loggedOut = '[Shared] Logged out',
  decodeJwtToken = '[Shared] Decode JwtToken',
  jwtTokenDecoded = '[Shared] JwtToken Decoded',
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

export const decodeJwtTokenAction = createAction(
  SharedActionTypes.decodeJwtToken,
  props<{ jwtToken?: string }>()
);

export const jwtTokenDecodedAction = createAction(
  SharedActionTypes.jwtTokenDecoded,
  props<{ userInfo?: UserInfo }>()
);
