import { createAction, props } from '@ngrx/store';
import { Semester, SemesterFilter } from 'src/app/models/Semester';

export enum SemesterActionTypes {
  semestersRequested = '[Semester] Semesters Requested',
  semestersLoaded = '[Semester] Semesters Loaded',
  semesterCreate = '[Semester] Semester Create',
  semesterCreated = '[Semester] Semester Created',
  semesterUpdate = '[Semester] Semester Update',
  semesterUpdated = '[Semester] Semester Updated',
}

export const semestersRequestedAction = createAction(
  SemesterActionTypes.semestersRequested,
  props<{ semesterFilter?: SemesterFilter }>()
);

export const semestersLoadedAction = createAction(
  SemesterActionTypes.semestersLoaded,
  props<{ semesters: Array<Semester> }>()
);

export const semesterCreateAction = createAction(
  SemesterActionTypes.semesterCreate,
  props<{ semester: Semester }>()
);

export const semesterCreatedAction = createAction(
  SemesterActionTypes.semesterCreated,
  props<{ semester: Semester }>()
);

export const semesterUpdateAction = createAction(
  SemesterActionTypes.semesterUpdate,
  props<{ semester: Semester }>()
);

export const semesterUpdatedAction = createAction(
  SemesterActionTypes.semesterUpdated,
  props<{ semester: Semester }>()
);
