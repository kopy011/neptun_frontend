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
  tap,
  throwError,
} from 'rxjs';
import { Semester, SemesterFilter } from '../models/Semester';
import { queryByFilter } from 'src/app/helpers/query';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  private semesterUrl = 'api/semesters/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSemesters(): Observable<Array<Semester>> {
    return this.http.get<Array<Semester>>(this.semesterUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  querySemesters(semesterFilter: SemesterFilter): Observable<Array<Semester>> {
    return this.getSemesters().pipe(
      retry(2),
      map((semesters) => {
        return semesters.filter((semester) =>
          queryByFilter(semester, semesterFilter)
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => EMPTY);
      })
    );
  }

  createSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(this.semesterUrl, semester);
  }

  updateSemester(semester: Semester): Observable<Semester> {
    return this.http.put<Semester>(
      this.semesterUrl,
      semester,
      this.httpOptions
    );
  }
}
