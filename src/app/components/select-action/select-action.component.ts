import {Component, OnInit} from '@angular/core';
import {faUser, faBook} from '@fortawesome/free-solid-svg-icons';
import {TokenService} from '../../core/auth/token/token.service';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {
  redirectUrl = 'https://fast-react-3f370.web.app/token?=';
  faUser = faUser;
  faBook = faBook;

  constructor(
      private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.redirectUrl += this.tokenService.getToken();
  }

}
