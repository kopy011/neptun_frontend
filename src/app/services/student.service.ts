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
import { Student, StudentFilter } from '../models/Student';
import { queryByFilter } from 'src/app/helpers/query';
import { CACHE_SIZE } from '../models/Constants';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentUrl = 'api/students/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private cache$?: Observable<Array<Student>>;

  constructor(private http: HttpClient) {}

  get students() {
    if (!this.cache$) {
      this.cache$ = this.getStudents().pipe(shareReplay(CACHE_SIZE));
    }

    return this.cache$;
  }

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
    return this.students.pipe(
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
    this.cache$ = undefined;
    return this.http.post<Student>(this.studentUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    this.cache$ = undefined;
    return this.http.put<Student>(this.studentUrl, student, this.httpOptions);
  }
}
