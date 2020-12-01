import { ListUserService } from './../../core/service/list-user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/model/user';
import { faCheck, faTimes, faEdit, faPlusCircle, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  users: User[];
  currentPage = 1;
  hasMore: boolean = false;
  hasLess: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listUserService: ListUserService
  ) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data['listUsers'])
    this.users = this.activatedRoute.snapshot.data['listUsers'];
    this.disableNextPageButton();
  }

  nextPage() {
    this.listUserService.listUsersPaginated(++this.currentPage)
      .subscribe(users => {
        this.users = users;
        this.hasLess = true;
        if (users.length < 10) this.hasMore = false;

      })
  }

  previousPage() {
    this.listUserService.listUsersPaginated(--this.currentPage)
      .subscribe(users => {
        this.users = users;
        this.hasMore = true;
        if (this.currentPage === 1) this.hasLess = false;
      })
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

  disableNextPageButton() {
    this.listUserService.getAllUsers()
      .subscribe(users => {
        this.hasMore = users.length > 10 ? true : false;
      })
  }

}
