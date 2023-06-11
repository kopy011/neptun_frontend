import { createAction, props } from '@ngrx/store';
import { Student, StudentFilter } from 'src/app/models/Student';

export enum StudentActionTypes {
  studentsRequested = '[Student] Students Requested',
  studentsLoaded = '[Student] Students Loaded',
  studentCreate = '[Student] Student Create',
  studentCreated = '[Student] Student Created',
  studentUpdate = '[Student] Student Update',
  studentUpdated = '[Student] Student Updated',
}

export const studentsRequestedAction = createAction(
  StudentActionTypes.studentsRequested,
  props<{ studentFilter?: StudentFilter }>()
);

export const studentsLoadedAction = createAction(
  StudentActionTypes.studentsLoaded,
  props<{ students: Array<Student> }>()
);

export const studentCreateAction = createAction(
  StudentActionTypes.studentCreate,
  props<{ student: Student }>()
);

export const studentCreatedAction = createAction(
  StudentActionTypes.studentCreated,
  props<{ student: Student }>()
);

export const studentUpdateAction = createAction(
  StudentActionTypes.studentUpdate,
  props<{ student: Student }>()
);

export const studentUpdatedAction = createAction(
  StudentActionTypes.studentUpdated,
  props<{ student: Student }>()
);
