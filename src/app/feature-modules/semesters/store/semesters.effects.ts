import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SemesterService } from 'src/app/services/semester.service';
import {
  SemesterActionTypes,
  semesterCreatedAction,
  semesterUpdatedAction,
  semestersLoadedAction,
} from './semesters.actions';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class SemesterEffects {
  constructor(
    private actions$: Actions,
    private semesterService: SemesterService
  ) {}

  loadSemesters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SemesterActionTypes.semestersRequested),
      mergeMap((action: any) => {
        if (!action.semesterFilter) {
          return this.semesterService.semesters.pipe(
            map((semesters) => semestersLoadedAction({ semesters })),
            catchError(() => EMPTY)
          );
        }
        return this.semesterService
          .querySemesters(action.semesterFilter)
          .pipe(map((semesters) => semestersLoadedAction({ semesters })));
      })
    );
  });

  createSemester$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SemesterActionTypes.semesterCreate),
      mergeMap((action: any) => {
        return this.semesterService.createSemester(action.semester).pipe(
          map((semester) => semesterCreatedAction({ semester })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  updateSemester$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SemesterActionTypes.semesterUpdate),
      mergeMap((action: any) => {
        return this.semesterService.updateSemester(action.semester).pipe(
          map((semester) => semesterUpdatedAction({ semester })),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
