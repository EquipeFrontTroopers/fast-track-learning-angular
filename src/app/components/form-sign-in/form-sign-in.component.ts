import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

import {AuthAppService} from '../../core/auth/auth-app.service';
import {TokenService} from '../../core/auth/token/token.service';

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.css']
})
export class FormSignInComponent implements OnInit {
  formSignIn: FormGroup;
  constructor(
    private authAppService: AuthAppService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.formSignIn = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('[a-z0-9.]+@(compasso)+\.[a-z]+(\.[a-z]+)?')]
      ],
      password: [
        '',
        [Validators.required]
      ]
    });
  }
  login(): void{
    const email = this.formSignIn.get('email').value;
    const password = this.formSignIn.get('password').value;

    if (this.formSignIn.valid && !this.formSignIn.pending) {
      this.authAppService.login( email, password ).then(
        user => {
          if ( user ) {
              const json = JSON.stringify( user );
              const data = JSON.parse( json );
              this.tokenService.setToken( data.user.stsTokenManager.accessToken );
              this.router.navigate(['select-action']);
          }
        }
      );
    }else if (this.formSignIn.get('email').errors && this.formSignIn.get('email').errors.pattern){
      Swal.fire({
        title: 'Erro',
        html: 'O E-mail informado não é um e-mail compasso válido!',
        icon: 'warning',
        cancelButtonText: 'Ok'
      });
    }
  }
}
