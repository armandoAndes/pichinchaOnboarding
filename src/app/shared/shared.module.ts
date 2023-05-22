import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageErrorPipe } from './pipes/message-error.pipe';
import { HeaderComponent } from './components/header/header.component';
import { RedirectService } from './services/redirect.service';
import { FilterBooksPipe } from './pipes/search-books/filter-books.pipe';
import { FilterSelectPipe } from './pipes/search-book-select/filter-select.pipe';
import { SearchMultipleCategorysPipe } from './pipes/search-book-multiple/search-multiple-categorys.pipe';



@NgModule({
  declarations: [
    MessageErrorPipe,
    HeaderComponent,
    FilterBooksPipe,
    FilterSelectPipe,
    SearchMultipleCategorysPipe],
  imports: [
    CommonModule
  ],
  providers: [RedirectService],
  exports: [
    MessageErrorPipe,
    HeaderComponent,
    FilterBooksPipe,
    FilterSelectPipe,
    SearchMultipleCategorysPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule { }
