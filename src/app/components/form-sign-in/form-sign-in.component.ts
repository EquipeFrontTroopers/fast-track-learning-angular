import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

import { AuthAppService } from '../../core/service/auth-app.service';

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent implements OnInit {
  formSignIn: FormGroup;

  constructor(
    private authAppService: AuthAppService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSignIn = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required, Validators.email
        ]
      ],
      password: [
        '',
        [Validators.required]
      ],
      remember: [
        false
      ],
      new_password: [
        ''
      ],
    });
  }

  login(): void {
    const email = this.formSignIn.get('email').value;
    const password = this.formSignIn.get('password').value;
    const remember = this.formSignIn.get('remember').value;
    const newPassword = this.formSignIn.get('new_password').value;
    this.userService.getUserByEmail(email)
      .subscribe(user => {
        if (user[0]) {
          if (remember) {
            Swal.fire({
              html: 'Se o E-mail informado for válido, enviaremos um link de confirmação para ' + email,
              icon: 'success',
              cancelButtonText: 'Enviar'
            });
          } else {
            if (this.formSignIn.valid && !this.formSignIn.pending) {
              if (user[0].acessoAprovado) {
                this.authAppService.login(email, password).then();
              } else {
                Swal.fire({
                  html: 'O seu acesso não está liberado',
                  icon: 'info',
                  cancelButtonText: 'Fechar'
                });
              }
            }
          }
          // else if (this.formSignIn.get('email').errors && this.formSignIn.get('email').errors.pattern) {
          //   Swal.fire({
          //     title: 'Erro',
          //     html: 'O E-mail informado não é um e-mail compasso válido!',
          //     icon: 'warning',
          //     cancelButtonText: 'Ok'
          //   });
          // }
        } else {
          Swal.fire({
            html: 'Usuário não encontrado',
            icon: 'warning',
            cancelButtonText: 'Fechar'
          });
        }
      });
  }
}
