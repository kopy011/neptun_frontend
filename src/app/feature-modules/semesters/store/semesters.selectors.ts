import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SemestersFeatureState,
  semestersFeatureKey,
} from './semesters.reducer';

export const selectFeature =
  createFeatureSelector<SemestersFeatureState>(semestersFeatureKey);

export const selectSemesters = createSelector(
  selectFeature,
  (state: SemestersFeatureState) => {
    return state.semesters;
  }
);
