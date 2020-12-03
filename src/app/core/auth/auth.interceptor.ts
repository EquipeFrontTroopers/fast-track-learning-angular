import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../service/token.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userService.getUser().subscribe( user => {
      console.log(user)
      if (user[0].tipoUsuarioId === 2 ){
        const url = 'https://fast-react-3f370.web.app?token=' + this.tokenService.getToken();
        window.location.href = url;
      }else{
        this.router.navigateByUrl('select-action');
      }
    });
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const headers = request.headers.set('user', token);
      request = request.clone({headers});
    }

    return next.handle(request);
  }
}
