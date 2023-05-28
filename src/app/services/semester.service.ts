import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Semester } from '../models/Semester';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  private semesterUrl = 'api/semesters/';

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
}
