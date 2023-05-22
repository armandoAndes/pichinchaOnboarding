import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { CategorysInterface } from '../../register-user/interface/categorys.interface';
import { BookRegister } from '../interface/books.interface';
import { RequestCreateBookInterface, ResponseCreateBookInterface } from '../interface/response-create.interface';


@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  constructor(public http: HttpClient) { }

  public getCategorys(): Observable<CategorysInterface[]> {
    return this.http.get<CategorysInterface[]>(environment.httpUrls.listCategorys);
  }
  public getListBooksByToken(token: string): Observable<BookRegister[]> {
    const requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<BookRegister[]>(environment.httpUrls.getBooksByToken, {
      headers: requestHeaders
    })
  }
  
  public createBook(token: string, newBook: RequestCreateBookInterface): Observable<ResponseCreateBookInterface> {
    const requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<ResponseCreateBookInterface>(environment.httpUrls.createBook, newBook, {
      headers: requestHeaders
    })
  }
}
