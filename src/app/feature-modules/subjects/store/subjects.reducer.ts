import { createReducer, on } from '@ngrx/store';
import { subjectsLoadedAction } from './subjects.actions';
import { Subject } from 'src/app/models/Subject';

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
  })
  // on(teacherCreatedAction, (state, { teacher }) => {
  //   const newTeachers = [...state.teachers, teacher];
  //   return { ...state, teachers: newTeachers };
  // }),
  // on(teacherUpdatedAction, (state) => {
  //   return { ...state };
  // })
);
