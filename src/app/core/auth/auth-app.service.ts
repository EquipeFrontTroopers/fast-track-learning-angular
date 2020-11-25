import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Md5} from 'ts-md5/dist/md5';
import {UserService} from "../user/user.service";


const API_URL = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class AuthAppService{

  private md5;

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    this.md5 = new Md5();

  }
  authenticate(email: string,password: string){
    const senha = this.md5.appendStr( password ).end();

    return this.http
      .get(API_URL + 'usuarios?' + 'email=' + email + `&senha=${senha}`,{observe: 'response'})
      .pipe(
        tap(
          res=>{
            //aqui fazer request para auth 0
             const authToken = res.headers.get('nome-do-token')
            this.userService.setToken(authToken);
          }
        )
      )
  }

}
