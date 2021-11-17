import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './shared/services/user.service';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('I just intercepted your request ');
    let token = this.authService.getAccessToken()
    console.log(`Here is your token ${token}`);
    // const token_found = true; // check localStorage
    if (token) {
      const myRequest = request.clone({
        headers: request.headers.set("Authorization", 'Bearer ' + token)
      })
      return next.handle(myRequest);
    } else {
      return next.handle(request);
    }

  }
}
