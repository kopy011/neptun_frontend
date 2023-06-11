import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, throwError } from 'rxjs';
import { Subject, SubjectFilter } from '../models/Subject';
import { queryByFilter } from 'src/app/helpers/query';

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

  querySubjects(subjectFilter: SubjectFilter): Observable<Array<Subject>> {
    return this.getSubjects().pipe(
      retry(2),
      map((subjects) => {
        return subjects.filter((subject) =>
          queryByFilter(subject, subjectFilter)
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => EMPTY);
      })
    );
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.subjectUrl, subject);
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.subjectUrl, subject, this.httpOptions);
  }
}
