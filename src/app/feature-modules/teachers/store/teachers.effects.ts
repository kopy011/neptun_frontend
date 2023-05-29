import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeacherService } from 'src/app/services/teacher.service';
import {
  TeacherActionTypes,
  teacherCreatedAction,
  teacherUpdatedAction,
  teachersLoadedAction,
} from './teachers.actions';
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

  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActionTypes.teacherCreate),
      mergeMap((action: any) => {
        return this.teacherService.createTeacher(action.teacher).pipe(
          map((teacher) => teacherCreatedAction({ teacher })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActionTypes.teacherUpdate),
      mergeMap((action: any) => {
        return this.teacherService.updateTeacher(action.teacher).pipe(
          map((teacher) => teacherUpdatedAction({ teacher })),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
