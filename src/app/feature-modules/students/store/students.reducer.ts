import { createReducer, on } from '@ngrx/store';
import { Student } from 'src/app/models/Student';
import {
  studentCreatedAction,
  studentUpdatedAction,
  studentsLoadedAction,
} from './students.actions';

export const studentsFeatureKey = 'studentsFeature';

export interface StudentsFeatureState {
  students: Array<Student>;
}

export const initialState: StudentsFeatureState = {
  students: [],
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, { students }) => {
    return { ...state, students };
  }),
  on(studentCreatedAction, (state, { student }) => {
    const newStudents = [...state.students, student];
    return { ...state, students: newStudents };
  }),
  on(studentUpdatedAction, (state) => {
    return { ...state };
  })
);
