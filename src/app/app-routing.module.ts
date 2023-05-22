import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then((m) => m.RegisterUserModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books-routing.module').then((m) => m.BooksRoutingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login-routing.module').then((m) => m.LoginRoutingModule)
  },
  {
    path: '',
    redirectTo: '/login/login-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
