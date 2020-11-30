import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserService} from '../user/user.service';
import {TokenService} from './token/token.service';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import firebase from 'firebase';
import User = firebase.User;



@Injectable({providedIn: 'root'})
export class AuthAppService{
  authInvalid: string;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public  afAuth: AngularFireAuth,
  ) {}

  isLogged(): boolean{
    return this.tokenService.hasToken();
  }

  async login(email: string, password: string): Promise<any> {

      return await this.afAuth.signInWithEmailAndPassword(email, password).catch(
        e => {
          let errorMessage = '';
          switch ( e.code ) {
            case 'auth/invalid-email':
              errorMessage = 'E-mail inválido';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Senha incorreta';
              break;
            case 'auth/user-not-found':
              errorMessage = 'Usuário não encontrado';
              break;
          }
          Swal.fire({
            title: 'Erro',
            html: errorMessage ? errorMessage : e.message,
            icon: 'warning',
            cancelButtonText: 'Ok'
          });
      }
    );
  }

  SignUp(email: string, password: string): Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.sendEmailVerification();
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  logout(): void{
    this.tokenService.removeToken();
    this.afAuth.signOut();
    this.router.navigate(['sign-in']);
  }
}
