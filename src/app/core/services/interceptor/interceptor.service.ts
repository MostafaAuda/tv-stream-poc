import { LoadingUIService } from './../loadingUI/loading-ui.service';

// import { ToastControllerService } from './../toastController/toast-controller.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private _loadingUIs: LoadingUIService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loadingUIs.showFullScreenSpinner();

    const modified = req.clone({
      setHeaders: {
        'Content-Security-Policy': `default-src 'self'; media-src *; img-src *; script-src *`,
        'Access-Control-Allow-Origin': `*`,
        'Access-Control-Allow-Headers': `Content-Type, Accept, x-requested-with`,
      },
    });

    //response
    return next.handle(modified).pipe(
      map((event: HttpEvent<any>) => {
        let convertedEvent: HttpEvent<any> = event;
        if (event instanceof HttpResponse) {
          this._loadingUIs.hideFullScreenSpinner();
        }
        return convertedEvent;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loadingUIs.hideFullScreenSpinner();

        return throwError(error);
      }),
      // retry(3),

      finalize(() => {})
    );
  }
}
