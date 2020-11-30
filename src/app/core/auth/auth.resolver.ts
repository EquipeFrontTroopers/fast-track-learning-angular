import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthResolver implements Resolve<any>{

  constructor(
  ) {}

  resolve(): any{
    return true;
  }


}
