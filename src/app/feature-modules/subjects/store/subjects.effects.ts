import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubjectService } from 'src/app/services/subject.service';
import {
  SubjectActionTypes,
  subjectCreatedAction,
  subjectUpdatedAction,
  subjectsLoadedAction,
} from './subjects.actions';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class SubjectEffects {
  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}

  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectActionTypes.subjectsRequested),
      mergeMap((action: any) => {
        if (!action.subjectFilter) {
          return this.subjectService.getSubjects().pipe(
            map((subjects) => subjectsLoadedAction({ subjects })),
            catchError(() => EMPTY)
          );
        }
        return this.subjectService
          .querySubjects(action.subjectFilter)
          .pipe(map((subjects) => subjectsLoadedAction({ subjects })));
      })
    );
  });

  createSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectActionTypes.subjectCreate),
      mergeMap((action: any) => {
        return this.subjectService.createSubject(action.subject).pipe(
          map((subject) => subjectCreatedAction({ subject })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  updateSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectActionTypes.subjectUpdate),
      mergeMap((action: any) => {
        return this.subjectService.updateSubject(action.subject).pipe(
          map((subject) => subjectUpdatedAction({ subject })),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
