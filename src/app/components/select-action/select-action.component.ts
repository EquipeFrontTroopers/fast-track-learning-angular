import {Component, OnInit} from '@angular/core';
import {faUser, faBook} from '@fortawesome/free-solid-svg-icons';
import {TokenService} from '../../core/service/token.service';
import {UserService} from '../../core/service/user.service';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {
  redirectUrl = 'https://fast-react-3f370.web.app?token=';
  faUser = faUser;
  faBook = faBook;
  userType;

  constructor(
      private tokenService: TokenService,
      private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe( userType => this.userType = userType[0].tipoUsuarioId);
    this.redirectUrl += this.tokenService.getToken();
  }

}
