import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedFeatureState, sharedFeatureKey } from './shared.reducer';

export const selectFeature =
  createFeatureSelector<SharedFeatureState>(sharedFeatureKey);

export const selectJwtToken = createSelector(
  selectFeature,
  (state: SharedFeatureState) => {
    return state.jwtToken;
  }
);

export const isLoggedIn = createSelector(
  selectFeature,
  (state: SharedFeatureState) => {
    return state.jwtToken ? true : false;
  }
);
