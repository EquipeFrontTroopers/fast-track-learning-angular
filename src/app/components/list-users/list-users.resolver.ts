import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../core/model/user';
import { ListUserService } from '../../core/service/list-user.service';

@Injectable({ providedIn: 'root' })
export class ListUserResolver implements Resolve<Observable<User[]>> {
  constructor(private service: ListUserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userName = route.params.userName;
    return this.service.listUsersPaginatedAndFiltered(1, "");
  }
}
