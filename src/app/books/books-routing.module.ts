import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileBookComponent } from './page/profile-book/profile-book.component';
import { RegisterBooksComponent } from './page/register-books/register-books.component';
import { DetailsBookComponent } from './page/details-book/details-book.component';
import { HomeLibrayComponent } from './page/home-libray/home-libray.component';

import { SessionValidateGuard } from '../shared/guard/session-validate.guard';

import { ResolverDetailBookResolver } from './resolver/resolver-detail-book.resolver';
import { EditBookResolver } from './resolver/resolver-edit/edit-book.resolver';

const routes: Routes = [
  {
    path: 'profile-book',
    component: ProfileBookComponent,
    canActivate: [SessionValidateGuard]
  },
  {
    path: 'register-books/:id',
    component: RegisterBooksComponent,
    canActivate: [SessionValidateGuard],
    resolve: {
      bookId: EditBookResolver
    }
  },
  {
    path: 'detail-book/:id',
    component: DetailsBookComponent,
    canActivate: [SessionValidateGuard],
    resolve: {
      bookId: ResolverDetailBookResolver
    }
  }
  ,
  {
    path: 'home-library',
    component: HomeLibrayComponent,
    canActivate: [SessionValidateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
