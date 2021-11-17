import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) { }
    showMessage(msg: string, yor_action: string) {
        this._snackBar.open(msg, '', { duration: 2000 });
    }
}