import { createReducer, on } from '@ngrx/store';
import { Semester } from 'src/app/models/Semester';
import {
  semesterCreatedAction,
  semesterUpdatedAction,
  semestersLoadedAction,
} from './semesters.actions';

export const semestersFeatureKey = 'semestersFeature';

export interface SemestersFeatureState {
  semesters: Array<Semester>;
}

export const initialState: SemestersFeatureState = {
  semesters: [],
};

export const semestersReducer = createReducer(
  initialState,
  on(semestersLoadedAction, (state, { semesters }) => {
    return { ...state, semesters };
  }),
  on(semesterCreatedAction, (state, { semester }) => {
    const newSemesters = [...state.semesters, semester];
    return { ...state, semesters: newSemesters };
  }),
  on(semesterUpdatedAction, (state) => {
    return { ...state };
  })
);
