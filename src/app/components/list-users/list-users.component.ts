import {Component, OnInit} from '@angular/core';
import {faCheck, faTimes, faEdit, faPlusCircle, faFilter} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {ListUserService} from '../../core/service/list-user.service';
import {forkJoin} from 'rxjs';
import {User} from '../../core/model/user';
import {TypeUser} from '../../core/model/type-user';

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

  users: User[] = [];
  typesUser: TypeUser[] = [];

  constructor(private listUserService: ListUserService) {
  }

  ngOnInit(): void {
    this.getTypesAndUsers();
  }

  getTypesAndUsers(): void {
    forkJoin([
      this.listUserService.getAll(),
      this.listUserService.getAllTypeUsers()
    ]).subscribe(([users, types]) => {
      this.users = users;
      this.typesUser = types;
    });
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
                  this.getTypesAndUsers();
                  Swal.fire('Sucesso', `${userSave.nome} atualizado`, 'success').then();
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
                  this.getTypesAndUsers();
                  Swal.fire('Sucesso', `${user.nome} atualizado`, 'success').then();
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
      || !user.email.match('[a-z0-9.]+@(compasso)+\.[a-z]+(\.[a-z]+)?')
      || !user.tipoUsuarioId
      || !user.nickname
    );
  }

  getHtmlFormNewUser(user: User): string {
    return `
      <form id="formUser">

          <input type="hidden" id="id" name="id" value="${user.id}">
          <input type="hidden" id="acessoAprovado" name="acessoAprovado" value="${user.acessoAprovado}">
          <input type="hidden" id="senha" name="senha" value="${user.senha}">

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
                type="text"
                name="email"
                pattern="[a-z0-9.]+@(compasso)+\.[a-z]+(\.[a-z]+)?"
                id="email"
                placeholder="Email"
                value="${user.email}"
                required>

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

  approveUser(user: User): void {
    this.listUserService
      .approve(user)
      .subscribe(
        () => {
          Swal
            .fire('Sucesso', `${user.nome} aprovado`, 'success')
            .then(() => this.removeUserFromArray(user));
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
            .then(() => this.removeUserFromArray(user));
        },
        () => Swal.fire('Ops...', `Erro interno`, 'error')
      );
  }

  removeUserFromArray(user: User): void {
    this.users = this.users.filter(u => u.id !== user.id);
  }

}
