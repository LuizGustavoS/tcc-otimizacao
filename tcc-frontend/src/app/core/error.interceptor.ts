import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              this.openSnackBar(error.message);
              if (error.error instanceof ErrorEvent) {
                return throwError(this.receiveErrorObj(error)); // client-side error
              }
              return throwError(this.receiveErrorObj(error)); // server-side error
            })
        );
  }

  receiveErrorObj(error: any) {
    return error.error;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

}
