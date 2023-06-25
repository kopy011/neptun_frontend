import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedFeatureState, sharedFeatureKey } from './shared.reducer';
import { Role } from 'src/app/models/enums/Role';

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

export const selectUser$ = createSelector(
  selectFeature,
  (state: SharedFeatureState) => {
    return state.userInfo;
  }
);

export const isAdmin = createSelector(
  selectFeature,
  (state: SharedFeatureState) => {
    if (
      state.userInfo?.role === Role.ADMIN ||
      state.userInfo?.roles?.includes(Role.ADMIN)
    ) {
      return true;
    }
    return false;
  }
);
