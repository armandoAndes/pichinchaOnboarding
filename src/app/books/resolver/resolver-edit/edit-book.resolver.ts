import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map, of } from 'rxjs';

import { BooksServiceService } from '../../service/books-service.service';

import { BookRegister } from '../../interface/books.interface';
import { SessionEnum } from '../../../shared/enums/session.enum';
import { ResponseLoginServiceInterface } from '../../../shared/interface/response-login-service.interface';

@Injectable({
  providedIn: 'root'
})
export class EditBookResolver implements Resolve<boolean | BookRegister> {
  constructor(public booksService: BooksServiceService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | BookRegister> {
    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
    if (route.params['id']) {
      return this.booksService.getListBooksByToken(session.access_token)
        .pipe(
          map((res: BookRegister[]) => {
            return res.find(book => book.id == route.params['id'])!;
          })
        )
    } else {
      return of(true);
    }
  }
}
