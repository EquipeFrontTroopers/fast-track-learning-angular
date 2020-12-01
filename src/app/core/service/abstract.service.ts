import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  protected http: HttpClient;
  private headers: HttpHeaders;
  public apiUrl = environment.ApiUrl;

  constructor(httpCliente: HttpClient) {
    this.http = httpCliente;
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

}
