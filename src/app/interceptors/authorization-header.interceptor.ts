import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, mergeMap } from 'rxjs';
import { selectJwtToken } from '../feature-modules/shared/store/shared.selectors';

@Injectable()
export class AuthorazitaionHeaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //todo await

    return this.store.select(selectJwtToken).pipe(
      mergeMap((jwtToken) => {
        const authReq = jwtToken
          ? req.clone({
              headers: req.headers.set('Authorization', jwtToken),
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
