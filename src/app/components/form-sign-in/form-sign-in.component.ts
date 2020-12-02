import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

<<<<<<< HEAD
import { AuthAppService } from '../../core/auth/auth-app.service';
=======
import {AuthAppService} from '../../core/service/auth-app.service';
>>>>>>> 7b4014cf2f7b7bfca6da211fd52225c302598012

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.css']
})
export class FormSignInComponent implements OnInit {
  formSignIn: FormGroup;

  constructor(
    private authAppService: AuthAppService,
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

    if (remember) {
      // this.authAppService.sendMaiRemember(email, newPassword);
      Swal.fire({
        html: 'Se o E-mail informado for válido, enviaremos um link de confirmação para ' + email,
        icon: 'success',
        cancelButtonText: 'Enviar'
      });

    } else {

      if (this.formSignIn.valid && !this.formSignIn.pending) {
        this.authAppService.login(email, password).then();
      }
      // else if (this.formSignIn.get('email').errors && this.formSignIn.get('email').errors.pattern) {
      //   Swal.fire({
      //     title: 'Erro',
      //     html: 'O E-mail informado não é um e-mail compasso válido!',
      //     icon: 'warning',
      //     cancelButtonText: 'Ok'
      //   });
      // }
    }
  }
}
