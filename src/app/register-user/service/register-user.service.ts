import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { CategorysInterface } from '../interface/categorys.interface';
import { UserRegister } from '../interface/user-register.interface';
import { ResponseVerifyUserInterface } from '../interface/verify-user-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(public http: HttpClient) { }

  public getCategorys(): Observable<CategorysInterface[]> {
    return this.http.get<CategorysInterface[]>(environment.httpUrls.listCategorys);
  }
  public createUser(request: UserRegister): Observable<string> {
    return this.http.post<string>(environment.httpUrls.createUser, request);
  }
  public verifyUser(username: string): Observable<ResponseVerifyUserInterface> {
    return this.http.get<ResponseVerifyUserInterface>(environment.httpUrls.verifyUser(username));
  }
}
