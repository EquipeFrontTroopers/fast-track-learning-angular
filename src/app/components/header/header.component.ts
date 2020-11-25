import {Component, OnInit} from '@angular/core';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {User} from '../../core/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  user: User;

  constructor() {
  }

  ngOnInit(): void {
    this.user = {
      id: 0,
      nome: '',
      nickname: 'Front Trooper\'s',
      tipoUsuarioId: 0,
      email: '',
      senha: '',
    };
  }

  isAuthenticated(): boolean {
    return true;
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
    // service auth...
  }

}
