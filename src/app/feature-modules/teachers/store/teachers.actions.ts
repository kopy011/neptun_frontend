import { createAction, props } from '@ngrx/store';
import { Teacher } from 'src/app/models/Teacher';

export enum TeacherActionTypes {
  teachersRequested = '[Teacher] Teachers Requested',
  teachersLoaded = '[Teacher] Teachers Loaded',
}

export const teachersRequestedAction = createAction(
  TeacherActionTypes.teachersRequested
);

export const teachersLoadedAction = createAction(
  TeacherActionTypes.teachersLoaded,
  props<{ teachers: Array<Teacher> }>()
);
