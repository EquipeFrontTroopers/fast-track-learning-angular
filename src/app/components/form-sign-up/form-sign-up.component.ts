import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

  formSignUp: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      email:
        [
          '', [Validators.required, Validators.email, Validators.pattern('[a-z0-9.]+@(compasso)+\.[a-z]+(\.[a-z]+)?')]
        ],
      nickname:
        [
          '', [Validators.required, Validators.minLength(3)]
        ],
      name:
        [
          '', [Validators.required, Validators.minLength(3)]
        ],
      password:
        [
          '', [Validators.required, Validators.minLength(8)]
        ],
      passwordRepeat:
        [
          '', [Validators.required, Validators.minLength(8)]
        ]
    });

    this.formSignUp.get('passwordRepeat').valueChanges.subscribe((value: string) => {
      if (this.formSignUp.get('password').value !== value) {
        this.formSignUp.get('passwordRepeat').setErrors({invalid: true});
      } else {
        this.formSignUp.get('passwordRepeat').clearValidators();
      }
    });

    this.formSignUp.get('email').valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (this.formSignUp.get('email').valid) {
          // service para validação de email
        }
      });
  }

  inputHasError(name: string): boolean {
    return !!(
      this.formSignUp.get(name).touched
      && this.formSignUp.get(name).value
      && this.formSignUp.get(name).invalid
    );
  }

  submit(): void {
    if (this.formSignUp.valid) {
      Swal.fire('Sucesso', 'Acesso cadastrado', 'success')
        .then(() => this.router.navigate(['']).then());
    }
  }

}
