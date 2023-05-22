import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';

import { RegisterUserComponent } from './page/register-user/register-user.component';

import { RegisterUserService } from './service/register-user.service';
import { ValidatorsService } from '../shared/validators/validators.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    SharedModule
  ],
  providers: [RegisterUserService, ValidatorsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class RegisterUserModule { }
