import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { InputPropertisEnum, StatusFomrConrolEnum } from '../enums/input-states.enum';

import { ValidationErrorLabels } from '../labels/validation-erros.labels';
import { RegisterUserService } from '../../register-user/service/register-user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public getStateInput(formControl: AbstractControl): InputPropertisEnum {
    return formControl.status === StatusFomrConrolEnum.invalid && formControl.touched ? InputPropertisEnum.stateError : InputPropertisEnum.stateNormal;
  }
  public setFormGroup(formGroup: FormGroup, nameControl: string, event: any): void {
    formGroup.get(nameControl)?.setValue(event.srcElement.value);
  }
  public setTouched(formGroup: FormGroup, nameControl: string): void {
    formGroup.get(nameControl)?.markAsTouched();
  }
  public validateLenghtCategorys(minLength: number): ValidatorFn {
    return (c: AbstractControl): any => {
      if (c.value.length >= minLength)
        return null;

      return { 'minLengthArray': { valid: false } };
    }
  }

  public matchPassword(password: { label: string; controlName: string }, confirmPassword: string): any {
    return (formGroup: FormGroup): any => {
      const passwordControl = formGroup.controls[password.controlName];
      const confirmControl = formGroup.controls[confirmPassword];
      if (confirmControl.errors && !confirmControl.errors['matchPassword']) {
        return;
      }
      if (passwordControl.value !== confirmControl.value) {
        confirmControl.setErrors({
          matchPassword: true,
          label: ValidationErrorLabels.noMatch
        })
      } else {
        confirmControl.setErrors(null);
      }
    }
  }
  public emailFormatValidation(): (control: AbstractControl) => {
    [key: string]: any;
  } | null {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const controlValue = control.value;
      return pattern.test(controlValue) ? null : { emailFormatValidation: true };
    };
  }

  public validateUrl(): (control: AbstractControl) => {
    [key: string]: any;
  } | null {
    const pattern = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      return pattern.test(control.value) ? null : { urlFormatValidation: true };
    };
  }
  public validatePassword(): (control: AbstractControl) => {
    [key: string]: any;
  } | null {
    const pattern = /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,64}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      return pattern.test(control.value) ? null : { urlFormatValidation: true };
    };
  }
  public verifyUsername(registerUserService: RegisterUserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = (control.value).trim().toLowerCase();

      return registerUserService
        .verifyUser(username)
        .pipe(map(isExisting => (isExisting.exists ? { userNameExists: true } : null)));
    };
  }
}
