import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { RegisterBooksComponent } from './page/register-books/register-books.component';
import { ProfileBookComponent } from './page/profile-book/profile-book.component';
import { BooksServiceService } from './service/books-service.service';
import { SharedModule } from '../shared/shared.module';
import { PreviewBookComponent } from './components/preview-book/preview-book.component';
import { DetailsBookComponent } from './page/details-book/details-book.component';
import { HomeLibrayComponent } from './page/home-libray/home-libray.component';


@NgModule({
  declarations: [
    RegisterBooksComponent,
    ProfileBookComponent,
    PreviewBookComponent,
    DetailsBookComponent,
    HomeLibrayComponent
  ],
  exports: [PreviewBookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  providers: [
    BooksServiceService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class BooksModule { }
