import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentService } from 'src/app/services/student.service';
import {
  StudentActionTypes,
  studentCreatedAction,
  studentUpdatedAction,
  studentsLoadedAction,
} from './students.actions';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ) {}

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActionTypes.studentsRequested),
      mergeMap((action: any) => {
        if (!action.studentFilter) {
          return this.studentService.students.pipe(
            map((students) => studentsLoadedAction({ students })),
            catchError(() => EMPTY)
          );
        }
        return this.studentService
          .queryStudents(action.studentFilter)
          .pipe(map((students) => studentsLoadedAction({ students })));
      })
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActionTypes.studentCreate),
      mergeMap((action: any) => {
        return this.studentService.createStudent(action.student).pipe(
          map((student) => studentCreatedAction({ student })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActionTypes.studentUpdate),
      mergeMap((action: any) => {
        return this.studentService.updateStudent(action.student).pipe(
          map((student) => studentUpdatedAction({ student })),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
