import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { ResponseLoginServiceInterface } from '../../shared/interface/response-login-service.interface';
import { BookRegister } from '../interface/books.interface';

import { SessionEnum } from '../../shared/enums/session.enum';

import { BooksServiceService } from '../service/books-service.service';


@Injectable({
  providedIn: 'root'
})
export class ResolverDetailBookResolver implements Resolve<BookRegister> {

  public book: BookRegister | undefined;
  constructor(public booksService: BooksServiceService) {

  }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookRegister> {
    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);

    return this.booksService.getListBooksByToken(session.access_token)
      .pipe(
        map((res: BookRegister[]) => {
          return res.find(book => book.id == route.params['id'])!;
        })
      )
  }
}
