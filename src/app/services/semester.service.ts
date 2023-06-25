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
  tap,
  throwError,
} from 'rxjs';
import { Semester, SemesterFilter } from '../models/Semester';
import { queryByFilter } from 'src/app/helpers/query';
import { CACHE_SIZE } from '../models/Constants';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  private semesterUrl = 'api/semesters/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private cache$?: Observable<Array<Semester>>;

  constructor(private http: HttpClient) {}

  get semesters() {
    if (!this.cache$) {
      this.cache$ = this.getSemesters().pipe(shareReplay(CACHE_SIZE));
    }

    return this.cache$;
  }

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
    return this.semesters.pipe(
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
    this.cache$ = undefined;
    return this.http.post<Semester>(this.semesterUrl, semester);
  }

  updateSemester(semester: Semester): Observable<Semester> {
    this.cache$ = undefined;
    return this.http.put<Semester>(
      this.semesterUrl,
      semester,
      this.httpOptions
    );
  }
}
