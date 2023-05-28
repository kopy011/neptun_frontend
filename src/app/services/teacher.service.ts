import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teacherUrl = 'api/teachers/';

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
}
