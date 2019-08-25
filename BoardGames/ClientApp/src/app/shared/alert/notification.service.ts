import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

 public config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


 public success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }

 public warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}


