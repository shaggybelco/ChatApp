import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService implements HttpInterceptor{

  constructor(private auth: TokenService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    // console.log(authToken + ' from interceptor')

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('token', `${authToken}`)
    });

    // localStorage.clear();
    // send cloned request with header to the next handler.
    return next.handle(authReq);
    
  }
}
