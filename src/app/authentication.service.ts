import { Injectable } from '@angular/core';
import { AccessService, QUser } from 'src/openapi';
import { Observable, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  me$: Observable<QUser>;

  constructor(
    private accessApi: AccessService
  ) {
    this.me$ = accessApi.me().pipe(
      catchError(() => of(null)),
      shareReplay(1)
    );
  }
}
