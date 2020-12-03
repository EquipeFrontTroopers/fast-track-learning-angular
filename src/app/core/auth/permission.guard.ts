import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthAppService} from '../service/auth-app.service';
import {UserService} from '../service/user.service';
import {TokenService} from '../service/token.service';


@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate{
  redirectUrl = 'https://fast-react-3f370.web.app?token=';

  constructor(
    private router: Router,
    private auth: AuthAppService,
    private userService: UserService,
    private tokenService: TokenService
    ) {}

  canActivate(): boolean{
    this.userService.getUser().subscribe( userType => {
      if ( userType[0].tipoUsuarioId === 2){
        window.location.href = this.redirectUrl + this.tokenService.getToken();
        return false;
      }else{
        return true;
      }
    });
  }
}
