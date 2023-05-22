import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationErrorLabels } from '../labels/validation-erros.labels';

@Pipe({
  name: 'messageError',
  pure: false
})
export class MessageErrorPipe implements PipeTransform {

  transform(formControl: AbstractControl, label: string, formControlChange: AbstractControl): string {
    if (formControlChange.hasError('required')) {
      return `${label} ${ValidationErrorLabels.required}`;
    } else if (formControlChange.hasError('max')) {
      return `${label} ${ValidationErrorLabels.max}`;
    } else if (formControlChange.hasError('min')) {
      return `${label} ${ValidationErrorLabels.min}`;
    } else if (formControlChange.hasError('email')) {
      return `${ValidationErrorLabels.email}`;
    } else if (formControlChange.hasError('matchPassword')) {
      return `${ValidationErrorLabels.noMatch}`;
    } else if (formControlChange.hasError('minLengthArray')) {
      return `${ValidationErrorLabels.categorys}`;
    } else if (formControlChange.hasError('emailFormatValidation')) {
      return `${ValidationErrorLabels.email}`;
    } else if (formControlChange.hasError('userNameExists')) {
      return `${ValidationErrorLabels.userExist}`;
    }else {
      return 'Error en este campo'
    }
  }
}
