import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom, mergeMap } from 'rxjs';
import { selectJwtToken } from '../feature-modules/shared/store/shared.selectors';

@Injectable()
export class AuthorazitaionHeaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectJwtToken).pipe(
      mergeMap((jwtToken) => {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', jwtToken ?? ''),
        });
        console.log(jwtToken);
        return next.handle(authReq);
      })
    );
  }
}
