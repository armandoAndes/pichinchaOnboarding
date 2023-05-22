import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ResponseLoginServiceInterface } from '../interface/response-login-service.interface';

import { SessionEnum } from '../enums/session.enum';

import { RedirectService } from '../services/redirect.service';

@Injectable({
  providedIn: 'root'
})
export class SessionValidateGuard implements CanActivate {
  constructor(public redirecService: RedirectService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
    if (!session) {
      this.redirecService.redirectRegister('/login/login-form');
    }
    return true;


  }

}
