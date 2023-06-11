import { createAction, props } from '@ngrx/store';
import { Subject, SubjectFilter } from 'src/app/models/Subject';

export enum SubjectActionTypes {
  subjectsRequested = '[Subject] Subjects Requested',
  subjectsLoaded = '[Subject] Subjects Loaded',
  subjectCreate = '[Subject] Subject Create',
  subjectCreated = '[Subject] Subject Created',
  subjectUpdate = '[Subject] Subject Update',
  subjectUpdated = '[Subject] Subject Updated',
}

export const subjectsRequestedAction = createAction(
  SubjectActionTypes.subjectsRequested,
  props<{ subjectFilter?: SubjectFilter }>()
);

export const subjectsLoadedAction = createAction(
  SubjectActionTypes.subjectsLoaded,
  props<{ subjects: Array<Subject> }>()
);

export const subjectCreateAction = createAction(
  SubjectActionTypes.subjectCreate,
  props<{ subject: Subject }>()
);

export const subjectCreatedAction = createAction(
  SubjectActionTypes.subjectCreated,
  props<{ subject: Subject }>()
);

export const subjectUpdateAction = createAction(
  SubjectActionTypes.subjectUpdate,
  props<{ subject: Subject }>()
);

export const subjectUpdatedAction = createAction(
  SubjectActionTypes.subjectUpdated,
  props<{ subject: Subject }>()
);
