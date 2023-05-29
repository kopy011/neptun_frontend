import { createAction, props } from '@ngrx/store';
import { Teacher } from 'src/app/models/Teacher';

export enum TeacherActionTypes {
  teachersRequested = '[Teacher] Teachers Requested',
  teachersLoaded = '[Teacher] Teachers Loaded',
  teacherCreate = '[Teacher] Teacher Create',
  teacherCreated = '[Teacher] Teacher Created',
  teacherUpdate = '[Teacher] Teacher Update',
  teacherUpdated = '[Teacher] Teacher Updated',
}

export const teachersRequestedAction = createAction(
  TeacherActionTypes.teachersRequested
);

export const teachersLoadedAction = createAction(
  TeacherActionTypes.teachersLoaded,
  props<{ teachers: Array<Teacher> }>()
);

export const teacherCreateAction = createAction(
  TeacherActionTypes.teacherCreate,
  props<{ teacher: Teacher }>()
);

export const teacherCreatedAction = createAction(
  TeacherActionTypes.teacherCreated,
  props<{ teacher: Teacher }>()
);

export const teacherUpdateAction = createAction(
  TeacherActionTypes.teacherUpdate,
  props<{ teacher: Teacher }>()
);

export const teacherUpdatedAction = createAction(
  TeacherActionTypes.teacherUpdated,
  props<{ teacher: Teacher }>()
);
