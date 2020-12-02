import { ListUserService } from './../../core/service/list-user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/model/user';
import { faCheck, faTimes, faEdit, faPlusCircle, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  LIST_PAGE_LIMIT = 10;
  faCheck = faCheck;
  faTimes = faTimes;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faFilter = faFilter;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  users: User[];
  filter: string = "";
  currentPage = 1;
  totalPages = 1;
  hasMore: boolean = false;
  hasLess: boolean = false;
  debounce: Subject<string> = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private listUserService: ListUserService
  ) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data['listUsers'])
    this.users = this.activatedRoute.snapshot.data['listUsers'];
    this.initializeListPagination();
  }

  nextPage() {
    this.listUserService.listUsersPaginatedAndFiltered(++this.currentPage, this.filter)
      .subscribe(users => {
        this.users = users;
        this.hasLess = true;
        this.hasMore = this.currentPage < this.totalPages;
      })
  }

  previousPage() {
    if (this.currentPage !== 1)
      this.listUserService.listUsersPaginatedAndFiltered(--this.currentPage, this.filter)
        .subscribe(users => {
          this.users = users;
          this.hasMore = true;
          this.hasLess = this.hasLessPages(this.currentPage);
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

  initializeListPagination() {
    this.listUserService.getAllUsers()
      .subscribe(users => {
        const totalUsuarios = users.length;
        this.initializePagination(totalUsuarios);
      })
  }

  initializeFilterPagination(filterValue: string) {
    this.listUserService.getAllUsersFiltered(filterValue)
      .subscribe(users => {
        const totalUsuarios = users.length;
        this.initializePagination(totalUsuarios);
      })
  }

  initializePagination(totalUsers: number) {
    this.hasMore = this.hasMorePages(totalUsers);
    this.totalPages = this.getTotalPages(totalUsers);
  }

  filterUsers(event: any) {
    this.filter = event.target.value;
    this.listUserService.listUsersPaginatedAndFiltered(1, this.filter)
      .pipe(distinctUntilChanged())
      .subscribe(users => {
        this.currentPage = 1;
        this.hasLess = false;
        this.users = users;
      });

    this.initializeFilterPagination(this.filter);
  }

  getTotalPages(totalUsers: number) {
    return Math.ceil(totalUsers / this.LIST_PAGE_LIMIT);
  }

  hasMorePages(totalUsers: number) {
    return totalUsers > 10 ? true : false;
  }

  hasLessPages(page: number) {
    return page === 1 ? false : true;
  }

}
