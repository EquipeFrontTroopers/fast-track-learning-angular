import {Component, OnInit} from '@angular/core';
import {AuthAppService} from "../../core/auth/auth-app.service";

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {

  constructor(
    private authAppService: AuthAppService
  ) {
    authAppService.handleAuth()
  }

  ngOnInit(): void {
  }
}
