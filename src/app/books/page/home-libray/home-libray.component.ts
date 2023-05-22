import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { HomeLibraryLabels } from '../../labels/library.labels';

import { ResponseLoginServiceInterface } from '../../../shared/interface/response-login-service.interface';
import { CategorysInterface } from '../../../register-user/interface/categorys.interface';
import { BookRegister, SelectComponentItemInterface } from '../../interface/books.interface';

import { SessionEnum } from '../../../shared/enums/session.enum';

import { BooksServiceService } from '../../service/books-service.service';
import { RedirectService } from '../../../shared/services/redirect.service';

@Component({
  selector: 'app-home-libray',
  templateUrl: './home-libray.component.html',
  styleUrls: ['./home-libray.component.scss']
})
export class HomeLibrayComponent implements OnInit, OnDestroy {
  public labelsHomeLibrary = HomeLibraryLabels;
  public subsGetBooks: Subscription | undefined;
  public subsGetCategorys: Subscription | undefined;
  public books: BookRegister[];
  public errorModal: string = '';
  public errorState: boolean = false;
  public categorys: CategorysInterface[];
  public selectOptins: SelectComponentItemInterface[];
  public searchModel: string = '';
  public categorysSelected: string[];
  constructor(public booksService: BooksServiceService, public redirectService: RedirectService) {
    this.categorys = [];
    this.books = [];
    this.selectOptins = [{ label: '', value: '' }];
    this.categorysSelected = [];
  }

  public ngOnInit(): void {
    this.getBooksByToken();
    this.getCategorysSelect();
  }
  public getBooksByToken(): void {
    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
    this.subsGetBooks = this.booksService.getListBooksByToken(session.access_token)
      .pipe(
        map((res: BookRegister[]) => {
          for (const book of res) {
            if (book.public) {
              this.books.push(book)
            }
          }
        })
      )
      .subscribe(
        {
          error: (err: any) => {
            this.errorModal = err;
            this.errorState = true;
          }
        })
  }
  public getCategorysSelect(): void {
    this.subsGetCategorys = this.booksService.getCategorys()
      .pipe(
        map((value: CategorysInterface[]) => {
          const selectItem: SelectComponentItemInterface[] = [];
          for (let item of value) {
            selectItem.push({
              label: item.description,
              value: item.id.toString()
            })
          }
          this.selectOptins = selectItem;
        })
      )
      .subscribe(
        {
          error: (err: any) => {
            this.errorModal = err;
            this.errorState = true;
          }
        }
      );
  }
  public moreBooks(): void {
    this.redirectService.redirectRegister('/books/profile-book');
  }

  public clickBook(event: BookRegister): void {
    this.redirectService.redirectRegisterResovler('/books/detail-book', event.id!);
  }
  public setValue(event: any) {
    this.searchModel = event.srcElement.value;
  }
  public setValueCategory(event: any, index: number) {
    if (event.detail.checked) {
      this.categorysSelected.push(this.selectOptins[index].value);
    } else {
      this.categorysSelected = this.categorysSelected.filter(item => item !== this.selectOptins[index].value)
    }
  }
  public ngOnDestroy(): void {
    this.subsGetBooks?.unsubscribe();
    this.subsGetCategorys?.unsubscribe();
  }
}
