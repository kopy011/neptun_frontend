import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeachersFeatureState, teachersFeatureKey } from './teachers.reducer';

export const selectFeature =
  createFeatureSelector<TeachersFeatureState>(teachersFeatureKey);

export const selectTeachers = createSelector(
  selectFeature,
  (state: TeachersFeatureState) => {
    return state.teachers;
  }
);
