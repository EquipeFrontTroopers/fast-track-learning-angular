import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {UserService} from "./user.service";

@Injectable({providedIn: 'root'})

export class UserResolver implements Resolve<any>{
  public user

  constructor(
    private userService: UserService
  ) {}

  resolve(): any{
    this.userService.userSubject.subscribe(user => this.user = user )
    return this.user
  }


}
