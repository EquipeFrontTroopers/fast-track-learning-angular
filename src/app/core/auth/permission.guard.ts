import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthAppService} from '../service/auth-app.service';
import {UserService} from '../service/user.service';
import {TokenService} from '../service/token.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate {
  redirectUrl = 'https://fast-react-3f370.web.app?token=';

  constructor(
    private router: Router,
    private auth: AuthAppService,
    private userService: UserService,
    private tokenService: TokenService
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.getUser().pipe(map((userType) => {
      if (userType && userType[0].tipoUsuarioId === 1) { // Gestor
        return true;
      } else { // Aluno
        window.location.href = this.redirectUrl + this.tokenService.getToken();
        return false;
      }
    }));
  }

}
