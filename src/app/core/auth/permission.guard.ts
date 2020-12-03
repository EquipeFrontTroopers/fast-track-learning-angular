import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {TokenService} from '../service/token.service';



@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate{

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  canActivate(): any{
    this.userService.getUser().subscribe( user => {
      if (user[0].tipoUsuarioId === 2 ){
        const url = 'https://fast-react-3f370.web.app?token=' + this.tokenService.getToken();
        window.location.href = url;
      }
    });
  }
}
