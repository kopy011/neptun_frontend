import { createReducer, on } from '@ngrx/store';
import { loggedInAction, loggedOutAction } from './shared.actions';

export const sharedFeatureKey = 'sharedFeature';

export interface SharedFeatureState {
  jwtToken?: string;
}

export const initialState: SharedFeatureState = {
  jwtToken: undefined,
};

export const sharedReducer = createReducer(
  initialState,
  on(loggedInAction, (state, { jwtToken }) => {
    return { ...state, jwtToken };
  }),
  on(loggedOutAction, (state) => {
    return { ...state, jwtToken: undefined };
  })
);
