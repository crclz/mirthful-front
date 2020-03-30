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

  push(message: string, action: string = "OK", duration: number = 3000) {
    if (message == null) {
      throw "Argument message is null.";
    }

    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
