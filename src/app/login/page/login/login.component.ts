import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoginLabels } from '../../labels/login.labels';

import { LoginService } from '../../service/login.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { RedirectService } from 'src/app/shared/services/redirect.service';

import { LoginRequestInterface } from '../../interface/request-login-service.interface';
import { ResponseLoginServiceInterface } from '../../../shared/interface/response-login-service.interface';

import { SessionEnum } from '../../../shared/enums/session.enum';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public labelsLogin = LoginLabels;
  public subsLogin: Subscription | undefined;
  public errorState: boolean = false;
  public messageError: string = '';
  public loginForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  )
  constructor(public loginService: LoginService, public validatorsService: ValidatorsService, public redirecService: RedirectService) { }

  public ngOnInit(): void {
  }
  public login(): void {
    const request: LoginRequestInterface = {
      password: this.loginForm.get('password')?.value,
      username: this.loginForm.get('username')?.value
    }
    this.subsLogin = this.loginService.login(request)
      .subscribe(
        {
          next: (res: ResponseLoginServiceInterface) => {
            const session = JSON.stringify(res);
            sessionStorage.setItem(SessionEnum.nameItem, session);
            this.redirecService.redirectRegister('/books/home-library');
          },
          error: (error: any) => {
            this.errorState = true;
            this.messageError = error.error.message;
          }
        });
  }
  public ngOnDestroy(): void {
    this.subsLogin?.unsubscribe();
  }
  test() {
    console.log("THIS", this.loginForm)
  }
}
