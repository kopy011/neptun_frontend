import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectsFeatureState, subjectsFeatureKey } from './subjects.reducer';

export const selectFeature =
  createFeatureSelector<SubjectsFeatureState>(subjectsFeatureKey);

export const selectSubjects = createSelector(
  selectFeature,
  (state: SubjectsFeatureState) => {
    return state.subjects;
  }
);
