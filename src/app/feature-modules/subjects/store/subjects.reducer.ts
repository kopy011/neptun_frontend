import { createReducer, on } from '@ngrx/store';
import { Subject } from 'src/app/models/Subject';
import {
  subjectCreatedAction,
  subjectUpdatedAction,
  subjectsLoadedAction,
} from './subjects.actions';

export const subjectsFeatureKey = 'subjectsFeature';

export interface SubjectsFeatureState {
  subjects: Array<Subject>;
}

export const initialState: SubjectsFeatureState = {
  subjects: [],
};

export const subjectsReducer = createReducer(
  initialState,
  on(subjectsLoadedAction, (state, { subjects }) => {
    return { ...state, subjects };
  }),
  on(subjectCreatedAction, (state, { subject }) => {
    const newSubjects = [...state.subjects, subject];
    return { ...state, subjects: newSubjects };
  }),
  on(subjectUpdatedAction, (state) => {
    return { ...state };
  })
);
