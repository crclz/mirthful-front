import { Injectable } from '@angular/core';
import { AccessService, QUser } from 'src/openapi';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { shareReplay, tap, catchError, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  me$: Observable<QUser>;

  private refresher$ = new BehaviorSubject<number>(0);

  constructor(
    private accessApi: AccessService,
    public dialog: MatDialog
  ) {
    this.me$ = this.refresher$.pipe(
      switchMap(_ => accessApi.me()),
      shareReplay(1)
    );
  }

  refresh() {
    this.refresher$.next(1);
  }

  showLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }
}
