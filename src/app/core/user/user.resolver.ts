import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {AuthAppService} from '../auth/auth-app.service';

@Injectable({providedIn: 'root'})

export class UserResolver implements Resolve<any>{

  constructor(
    private authZero: AuthService,
    private auth: AuthAppService
  ) {}

  resolve(): any{
    return false
  }


}
