import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeacherActionTypes, teachersLoadedAction } from './teachers.actions';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class TeacherEffects {
  constructor(
    private actions$: Actions,
    private teacherService: TeacherService
  ) {}

  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActionTypes.teachersRequested),
      mergeMap(() => {
        return this.teacherService.getTeachers().pipe(
          map((teachers) => teachersLoadedAction({ teachers })),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
