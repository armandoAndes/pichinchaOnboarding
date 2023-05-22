import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';

import { RegisterUserLabels } from '../../labels/register-user.labels';

import { RegisterUserService } from '../../service/register-user.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { RedirectService } from 'src/app/shared/services/redirect.service';

import { UserRegister } from '../../interface/user-register.interface';
import { CategorysInterface } from '../../interface/categorys.interface';

import { StatusFomrConrolEnum } from '../../../shared/enums/input-states.enum';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  public labelsRegister = RegisterUserLabels;
  public enumsControl = StatusFomrConrolEnum;
  public categorys: CategorysInterface[];
  public categorysSelected: number[];
  public subsGetCategorys: Subscription | undefined;/* En plural o un arreglo*/
  public subsGetCreateUser: Subscription | undefined;
  public errorModal: string = '';
  public errorState: boolean = false;
  public registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required], [this.validatorsService.verifyUsername(this.registerService)]),
      email: new FormControl('', [Validators.required, this.validatorsService.emailFormatValidation()]),
      validateEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, this.validatorsService.validatePassword()]),
      categorys: new FormControl([], [this.validatorsService.validateLenghtCategorys(3)]),
    },
    {
      validators: this.validatorsService.matchPassword({ label: 'Claveasd', controlName: 'password' }, 'validateEmail'),
    }
  )
  constructor(public registerService: RegisterUserService, public validatorsService: ValidatorsService, public redirecService: RedirectService) {
    this.categorys = [];
    this.categorysSelected = [];
  }

  public seValueCategory(event: any, index: number) {
    if (event.detail.checked) {
      this.categorysSelected.push(this.categorys[index].id);
    } else {
      this.categorysSelected = this.categorysSelected.filter(item => item !== this.categorys[index].id)
    }
    this.registerForm.get('categorys')?.setValue(this.categorysSelected)
  }
  public async ngOnInit(): Promise<void> {
    this.getCategories();
  }
  public getCategories(): void {
    this.subsGetCategorys = this.registerService.getCategorys()
      .pipe(
        map((response: CategorysInterface[]) => {
          for (let category of response) {
            category.state = false;
          }
          this.categorys = response;
        })
      ).subscribe(
        {
          error: (err: any) => {
            this.errorModal = err;
            this.errorState = true;
          }
        }
      );
  }
  public createUser(): void {
    const request: UserRegister = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      categorys: this.registerForm.get('categorys')?.value,
    }
    this.subsGetCreateUser = this.registerService.createUser(request)
      .subscribe({
        next: () => {
          this.redirecService.redirectRegister('/books/home-library');
        },
        error: (err: any) => {
          this.errorModal = err;
          this.errorState = true;
        }
      })
  }
  public ngOnDestroy(): void {
    this.subsGetCategorys?.unsubscribe();
    this.subsGetCreateUser?.unsubscribe();
  }

}
