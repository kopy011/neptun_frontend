import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectUrl = 'api/subjects/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(this.subjectUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
