import {Component, OnInit} from '@angular/core';
import {User} from '../../core/model/user';
import {faCheck, faTimes, faEdit, faPlusCircle, faFilter} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faFilter = faFilter;

  users: User[];

  constructor() {
  }

  ngOnInit(): void {
    // this.users = [
    //   {
    //     nickname: '',
    //     email: 'wesley.belizario@compasso.com.br',
    //     nome: 'Wesley Belizario',
    //     id: 1,
    //     senha: '',
    //     tipoUsuarioId: 0
    //   },
    //   {
    //     nickname: '',
    //     email: 'wesley.belizario@compasso.com.br',
    //     nome: 'Wesley Belizario',
    //     id: 2,
    //     senha: '',
    //     tipoUsuarioId: 0
    //   },
    //   {
    //     nickname: '',
    //     email: 'wesley.belizario@compasso.com.br',
    //     nome: 'Wesley Belizario',
    //     id: 3,
    //     senha: '',
    //     tipoUsuarioId: 0
    //   }
    // ];
  }

  aprovRejectUser(user: User, status: boolean): void {
    Swal
      .fire({
        title: (status ? 'Aprovar' : 'Reprovar') + ' usuário?',
        html: '',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim'
      })
      .then();
  }

}
