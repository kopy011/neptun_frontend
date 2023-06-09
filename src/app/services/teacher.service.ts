import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, throwError } from 'rxjs';
import { Teacher, TeacherFilter } from '../models/Teacher';
import { queryByFilter } from 'src/helpers/query';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teacherUrl = 'api/teachers/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

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
    return this.getTeachers().pipe(
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
    return this.http.post<Teacher>(this.teacherUrl, teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.teacherUrl, teacher, this.httpOptions);
  }
}
