import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  map,
  retry,
  shareReplay,
  throwError,
} from 'rxjs';
import { Teacher, TeacherFilter } from '../models/Teacher';
import { queryByFilter } from 'src/app/helpers/query';
import { CACHE_SIZE } from '../models/Constants';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teacherUrl = 'api/teachers/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private cache$?: Observable<Array<Teacher>>;

  constructor(private http: HttpClient) {}

  get teachers() {
    if (!this.cache$) {
      this.cache$ = this.getTeachers().pipe(shareReplay(CACHE_SIZE));
    }

    return this.cache$;
  }

  getTeachers(): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.teacherUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  queryTeachers(teacherFilter: TeacherFilter): Observable<Array<Teacher>> {
    return this.teachers.pipe(
      retry(2),
      map((teachers) => {
        return teachers.filter((teacher) =>
          queryByFilter(teacher, teacherFilter)
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => EMPTY);
      })
    );
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    this.cache$ = undefined;
    return this.http.post<Teacher>(this.teacherUrl, teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    this.cache$ = undefined;
    return this.http.put<Teacher>(this.teacherUrl, teacher, this.httpOptions);
  }
}
