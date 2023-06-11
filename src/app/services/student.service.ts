import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, throwError } from 'rxjs';
import { Student, StudentFilter } from '../models/Student';
import { queryByFilter } from 'src/app/helpers/query';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentUrl = 'api/students/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(this.studentUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  queryStudents(studentFilter: StudentFilter): Observable<Array<Student>> {
    return this.getStudents().pipe(
      retry(2),
      map((students) => {
        return students.filter((student) =>
          queryByFilter(student, studentFilter)
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => EMPTY);
      })
    );
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.studentUrl, student, this.httpOptions);
  }
}
