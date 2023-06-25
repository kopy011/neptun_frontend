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
import { Subject, SubjectFilter } from '../models/Subject';
import { queryByFilter } from 'src/app/helpers/query';
import { CACHE_SIZE } from '../models/Constants';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectUrl = 'api/subjects/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private cache$?: Observable<Array<Subject>>;

  constructor(private http: HttpClient) {}

  get subjects() {
    if (!this.cache$) {
      this.cache$ = this.getSubjects().pipe(shareReplay(CACHE_SIZE));
    }

    return this.cache$;
  }

  getSubjects(): Observable<Array<Subject>> {
    console.log('get subjects');
    return this.http.get<Array<Subject>>(this.subjectUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  querySubjects(subjectFilter: SubjectFilter): Observable<Array<Subject>> {
    return this.subjects.pipe(
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
    this.cache$ = undefined;
    return this.http.post<Subject>(this.subjectUrl, subject);
  }

  updateSubject(subject: Subject): Observable<Subject> {
    this.cache$ = undefined;
    return this.http.put<Subject>(this.subjectUrl, subject, this.httpOptions);
  }
}
