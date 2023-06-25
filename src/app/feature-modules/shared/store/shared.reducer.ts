import { createReducer, on } from '@ngrx/store';
import {
  jwtTokenDecodedAction,
  loggedInAction,
  loggedOutAction,
} from './shared.actions';
import { Subject } from 'rxjs';
import { UserInfo } from 'src/app/models/User';

export const sharedFeatureKey = 'sharedFeature';

export interface SharedFeatureState {
  jwtToken?: string;
  userInfo?: UserInfo;
}

export const initialState: SharedFeatureState = {
  jwtToken: undefined,
  userInfo: undefined,
};

export const sharedReducer = createReducer(
  initialState,
  on(loggedInAction, (state, { jwtToken }) => {
    return { ...state, jwtToken };
  }),
  on(loggedOutAction, (state) => {
    return { ...state, jwtToken: undefined };
  }),
  on(jwtTokenDecodedAction, (state, { userInfo }) => {
    return { ...state, userInfo };
  })
);
