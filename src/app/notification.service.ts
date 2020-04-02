import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackbar: MatSnackBar
  ) {
  }

  push(message: string, action: string = null, duration: number = 3000) {
    if (message == null) {
      throw "Argument message is null.";
    }

    this.snackbar.open(message, action, {
      duration: duration
    });
  }

  ok(msg: string = "OK!") {
    this.push(msg);
  }

  error(res: any) {
    this.push(res.error.message);
  }
}
