import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserService} from './user.service';
import {TokenService} from './token.service';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class AuthAppService{
  authInvalid: string;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public  afAuth: AngularFireAuth
  ) {}

  isLogged(): boolean{
    return this.tokenService.hasToken();
  }

  async login(email: string, password: string): Promise<any> {

      return await this.afAuth.signInWithEmailAndPassword(email, password)
        .then(
          user => {
            if (user) {
              const json = JSON.stringify(user);
              const data = JSON.parse(json);
              if (!data.user.emailVerified){
                Swal.fire({
                  title: 'Ops',
                  html: 'Você ainda não confirmou seu E-mail',
                  icon: 'warning',
                  cancelButtonText: 'Ok'
                });
                this.tokenService.removeToken();
                this.router.navigate(['sign-in']);
              }else{
                this.tokenService.setToken(data.user.stsTokenManager.accessToken);
                this.router.navigate(['select-action']);
              }
            }
          }
        )
        .catch(
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

  SignUp(email: string, password: string, nickName: string){

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        const user = JSON.parse(JSON.stringify(result.user));

        const newData = {
          nickname: nickName,
          email: user.email,
          tipoUsuarioId: 2,
          acessoAprovado: false
        };

        this.http.post(API + '/usuarios', newData).subscribe();

        Swal.fire({
          title: 'Sucesso',
          html: 'Acesso cadastrado',
          icon: 'success',
          cancelButtonText: 'Ok'
        }).then(() =>
          {
            this.router.navigate(['sign-in']);
          }
        );
        result.user.sendEmailVerification();
      }).catch((error) => {
        let errorMessage = '';
        switch ( error.code ) {
          case 'auth/email-already-in-use':
            errorMessage = 'E-mail informado já está em uso';
            break;
        }
        Swal.fire({
          title: 'Erro',
          html: errorMessage ? errorMessage : error.message,
          icon: 'warning',
          cancelButtonText: 'Ok'
        });
      });
  }

  logout(): void{
    this.tokenService.removeToken();
    this.afAuth.signOut();
    this.router.navigate(['sign-in']);
  }
}
