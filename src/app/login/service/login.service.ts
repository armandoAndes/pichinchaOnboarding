import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequestInterface } from '../interface/request-login-service.interface';
import { ResponseLoginServiceInterface } from '../../shared/interface/response-login-service.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  public login(request: LoginRequestInterface): Observable<ResponseLoginServiceInterface> {
    return this.http.post<ResponseLoginServiceInterface>(environment.httpUrls.login, request);
  }
}
