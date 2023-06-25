import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, throwError } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'api/users/';

  private fakeJwtTokens: Record<string, string> = {
    ADMIN_USER:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODcxODQyMTUsImV4cCI6MTcxODcyMDIxNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiQURNSU5fVVNFUiIsInJvbGUiOiJBZG1pbiIsImlkIjoiMSJ9.zyd3WjAfEekNE4_GssklLTPrk1-qEJvVAuM-FVkEtdk',
    TEACHER_USER:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODcxODQyMTUsImV4cCI6MTcxODcyMDIxNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiVEVBQ0hFUl9VU0VSIiwicm9sZSI6IlRlYWNoZXIiLCJpZCI6IjIiLCJlbWFpbCI6Im1hdGVrQG1pay51bmktcGFubm9uLmh1In0.CPTO1Fi-oD7r08QSBExCfkTIoQTBYGvU5FtK2E0ly4E',
    STUDENT_USER:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODcxODQyMTUsImV4cCI6MTcxODcyMDIxNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiU1RVREVOVF9VU0VSIiwicm9sZSI6IlN0dWRlbnQiLCJpZCI6IjMiLCJlbWFpbCI6InNtYXJ0QGJvaS5jb20ifQ.0i7XM7wroTG4Bgt4S4ElIhx_odPS5Hq1tRBYJRL5EkE',
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string | undefined> {
    return this.http.get<Array<User>>(this.userUrl).pipe(
      retry(2),
      map((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (!user) {
          return undefined;
        }

        return this.fakeJwtTokens[user.username];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
