import {Component} from '@angular/core';
import {AuthAppService} from "../../core/auth/auth-app.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  constructor(
    public auth: AuthAppService
  ) {
  }

}
