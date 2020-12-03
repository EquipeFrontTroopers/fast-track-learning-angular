
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { faCheck, faTimes, faEdit, faPlusCircle, faFilter, faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../../core/model/user';
import { ListUserService } from '../../core/service/list-user.service';
import { TypeUser } from '../../core/model/type-user';

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
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  faFilter = faFilter;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  users: User[];
  typesUser: TypeUser[] = [];
  filter: string = "";
  currentPage = 1;
  totalPages = 1;
  hasMore: boolean = false;
  hasLess: boolean = false;
  debounce: Subject<string> = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private listUserService: ListUserService,
    public afAuth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.getTypesAndUsers();
    this.initializeListPagination();
  }

  getTypeUserById(typeUserId: number): TypeUser {
    return this.typesUser.find(t => t.id === typeUserId);
  }

  approveUserAlert(user: User): void {
    Swal
      .fire({
        title: `Aprovar acesso`,
        html: `Aprovar acesso do usuário ${user.nome}?`,
        icon: 'info',
        confirmButtonColor: 'orange',
        confirmButtonText: 'Sim',
        showDenyButton: true,
        denyButtonText: 'Não'
      })
      .then(value => {
        if (value.isConfirmed) {
          this.approveUser(user);
        } else if (value.isDenied) {
          this.reproveUser(user);
        }
      });
  }

  removeUserAlert(user: User): void {
    Swal
      .fire({
        title: `Atenção`,
        html: `Deseja realmente remover o acesso do usuário ${user.nome}?`,
        icon: 'warning',
        confirmButtonColor: 'orange',
        confirmButtonText: 'Sim',
        showDenyButton: true,
        denyButtonText: 'Não'
      })
      .then(value => {
        if (value.isConfirmed) {
          this.deleteUser(user);
        }
      });
  }

  approveUser(user: User): void {
    this.listUserService
      .approve(user)
      .subscribe(
        () => {
          Swal
            .fire('Sucesso', `${user.nome} aprovado`, 'success')
            .then(() => this.refreshList());
        },
        () => Swal.fire('Ops...', `Erro interno`, 'error')
      );
  }

  reproveUser(user: User): void {
    this.listUserService
      .reject(user)
      .subscribe(
        () => {
          Swal
            .fire('Sucesso', `${user.nome} reprovado`, 'success')
            .then(() => this.refreshList());
        },
        () => Swal.fire('Ops...', `Erro interno`, 'error')
      );
  }

  deleteUser(user: User): void {
    this.listUserService
      .delete(user)
      .subscribe(
        () => {
          Swal
            .fire('Sucesso', `${user.nome} foi removido`, 'success')
            .then(() => this.refreshList());
        },
        () => Swal.fire('Ops...', `Erro interno`, 'error')
      );
  }

  refreshList(): void {
    this.listUserService.listUsersPaginatedAndFiltered(1, "")
      .pipe(distinctUntilChanged())
      .subscribe(users => {
        this.currentPage = 1;
        this.hasLess = false;
        this.users = users;
      });
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

  initializeListPagination() {
    this.listUserService.getAll()
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

  getTypesAndUsers(): void {
    this.users = this.activatedRoute.snapshot.data['listUsers'];
    this.listUserService.getAllTypeUsers()
      .subscribe(types => { this.typesUser = types });
  }

  addUserAlert(): void {
    Swal
      .fire({
        title: 'Adicionar usuário',
        html: this.getHtmlFormNewUser({
          id: 0,
          nome: '',
          nickname: '',
          tipoUsuarioId: 0,
          email: '',
          senha: '',
          acessoAprovado: true,
        }),
        confirmButtonText: 'Adicionar',
        confirmButtonColor: 'orange'
      })
      .then(value => {
        if (value.isConfirmed) {
          const userSave: User = this.getFormUser();
          if (this.userIsValid(userSave)) {
            this.listUserService
              .save(userSave)
              .subscribe(
                () => {
                  console.log(userSave);
                  this.afAuth.createUserWithEmailAndPassword(userSave.email, userSave.senha)
                    .then((result) => {
                      console.log(result);
                      result.user.sendEmailVerification();
                      Swal.fire('Sucesso', `${userSave.nome} atualizado`, 'success').then();
                      this.refreshList();
                    });
                },
                () => Swal.fire('Ops...', `Erro interno`, 'error').then()
              );
          }
        }
      });
  }

  editUserAlert(user: User): void {
    Swal
      .fire({
        title: `Editar usuário`,
        html: this.getHtmlFormNewUser(user),
        confirmButtonText: 'Salvar',
        confirmButtonColor: 'orange'
      })
      .then(value => {
        if (value.isConfirmed) {
          const userUpdate: User = this.getFormUser();
          if (this.userIsValid(userUpdate)) {
            this.listUserService
              .update(userUpdate)
              .subscribe(
                () => {
                  Swal.fire('Sucesso', `${user.nome} atualizado`, 'success').then();
                  this.refreshList()
                },
                () => Swal.fire('Ops...', `Erro interno`, 'error').then()
              );
          }
        }
      });
  }

  userIsValid(user: User): boolean {
    return !(
      !user.nome
      || !user.email
      || !user.tipoUsuarioId
      || !user.nickname
    );
  }

  getHtmlFormNewUser(user: User): string {
    return `
      <form id="formUser">

          <input type="hidden" id="id" name="id" value="${user.id}">
          <input type="hidden" id="acessoAprovado" name="acessoAprovado" value="${user.acessoAprovado}">

          <input class="form-content-item"
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome"
          value="${user.nome}"
          required>

          <input class="form-content-item"
          type="text"
                name="nickname"
                id="nickname"
                placeholder="Nickname"
                value="${user.nickname}"
                required>


          <input class="form-content-item"
                type="hidden"
                name="email"
                id="email"
                placeholder="Email"
                value="${user.email}"
                required>

          <input
            id="senha"
            type="${user.id ? 'hidden' : "password"}"
            name="senha"
            value="${user.senha}"
            class="form-content-item"
            placeholder="Senha"
            minlength="6"
            >

          <select class="form-content-item" id="tipoUsuarioId" required>
              <option value="0" disabled ${user.tipoUsuarioId === 0 && 'selected'}>-- selecione uma permissão --</option>
              ${this.typesUser.map(t => {
      return `<option value="${t.id}" ${user.tipoUsuarioId === t.id && 'selected'}>${t.descricao}</option>`;
    })}
          </select>

      </form>
    `;
  }

  getFormUser(): User {
    return {
      id: Number((document.getElementById('id') as HTMLInputElement).value),
      nome: (document.getElementById('nome') as HTMLInputElement).value,
      nickname: (document.getElementById('nickname') as HTMLInputElement).value,
      tipoUsuarioId: Number((document.getElementById('tipoUsuarioId') as HTMLInputElement).value),
      email: (document.getElementById('email') as HTMLInputElement).value,
      senha: (document.getElementById('senha') as HTMLInputElement).value,
      acessoAprovado: (document.getElementById('acessoAprovado') as HTMLInputElement).value === 'true'
    };
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
