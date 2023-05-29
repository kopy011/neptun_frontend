import { createReducer, on } from '@ngrx/store';
import { Teacher } from 'src/app/models/Teacher';
import {
  teacherCreatedAction,
  teacherUpdatedAction,
  teachersLoadedAction,
} from './teachers.actions';

export const teachersFeatureKey = 'teachersFeature';

export interface TeachersFeatureState {
  teachers: Array<Teacher>;
}

export const initialState: TeachersFeatureState = {
  teachers: [],
};

export const teachersRecucer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, { teachers }) => {
    return { ...state, teachers };
  }),
  on(teacherCreatedAction, (state, { teacher }) => {
    const newTeachers = [...state.teachers, teacher];
    return { ...state, teachers: newTeachers };
  }),
  on(teacherUpdatedAction, (state) => {
    return { ...state };
  })
);
