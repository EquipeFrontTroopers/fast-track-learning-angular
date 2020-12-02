import {Component, OnInit} from '@angular/core';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {AuthAppService} from '../../core/service/auth-app.service';
import {UserService} from '../../core/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  user: any;

  constructor(public authAppService: AuthAppService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  isLogged(): boolean {
    return this.authAppService.isLogged();
  }

  logoutConfirm(): void {
    Swal
      .fire({
        title: 'Deseja realmente fazer logout?',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
      })
      .then(value => {
        if (value.isConfirmed) {
          this.logout();
        }
      });
  }

  logout(): void {
    this.authAppService.logout();
  }

}
