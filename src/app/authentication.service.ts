import { Injectable } from '@angular/core';
import { AccessService, QUser } from 'src/openapi';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { shareReplay, tap, catchError, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  me$: Observable<QUser>;

  private refresher$ = new BehaviorSubject<number>(0);

  constructor(
    private accessApi: AccessService,
    public dialog: MatDialog,
    public noti: NotificationService
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
      width: '20rem'
    });
  }

  logout(): void {
    this.accessApi.clearAccessCookie()
      .subscribe(() => {
        this.noti.ok("退出成功")
        this.refresher$.next(2);
      }, p => this.noti.error(p));
  }
}
