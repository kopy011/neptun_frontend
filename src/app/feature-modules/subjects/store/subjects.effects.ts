import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectActionTypes, subjectsLoadedAction } from './subjects.actions';

@Injectable()
export class SubjectEffects {
  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}

  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectActionTypes.subjectsRequested),
      mergeMap(() => {
        return this.subjectService.getSubjects().pipe(
          map((subjects) => subjectsLoadedAction({ subjects })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  // createTeacher$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TeacherActionTypes.teacherCreate),
  //     mergeMap((action: any) => {
  //       return this.teacherService.createTeacher(action.teacher).pipe(
  //         map((teacher) => teacherCreatedAction({ teacher })),
  //         catchError(() => EMPTY)
  //       );
  //     })
  //   );
  // });

  // updateTeacher$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TeacherActionTypes.teacherUpdate),
  //     mergeMap((action: any) => {
  //       return this.teacherService.updateTeacher(action.teacher).pipe(
  //         map((teacher) => teacherUpdatedAction({ teacher })),
  //         catchError(() => EMPTY)
  //       );
  //     })
  //   );
  // });
}
