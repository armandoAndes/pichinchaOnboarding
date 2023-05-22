import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { BooksServiceService } from '../../service/books-service.service';
import { RedirectService } from '../../../shared/services/redirect.service';

import { SessionEnum } from '../../../shared/enums/session.enum';

import { ProfileLabels } from '../../labels/profile.labels';

import { ResponseLoginServiceInterface } from '../../../shared/interface/response-login-service.interface';
import { CategorysInterface } from '../../../register-user/interface/categorys.interface';
import { BookRegister, SelectComponentItemInterface } from '../../interface/books.interface';
import { BookCommon } from '../../enums/book-common.enum';


@Component({
  selector: 'app-profile-book',
  templateUrl: './profile-book.component.html',
  styleUrls: ['./profile-book.component.scss']
})
export class ProfileBookComponent implements OnInit, OnDestroy {
  public subsGetBooks: Subscription | undefined;
  public profileLabels = ProfileLabels;
  public searchModel = '';
  public subsGetCategorys: Subscription | undefined;
  public categorys: CategorysInterface[];
  public selectOptins: SelectComponentItemInterface[];
  public selected: SelectComponentItemInterface;
  public books: BookRegister[];
  public errorModal: string = '';
  public errorState: boolean = false;
  constructor(public booksService: BooksServiceService, public redirectService: RedirectService) {
    this.categorys = [];
    this.books = [];
    this.selectOptins = [{ label: 'All', value: '0' }];
    this.selected = { label: '', value: '' };
  }

  public setValue(event: any): void {
    this.searchModel = event.srcElement.value;
  }
  public ngOnInit(): void {
    this.getBooksByToken();
    this.getCategorysSelect();
  }
  public getBooksByToken(): void {
    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
    this.subsGetBooks = this.booksService.getListBooksByToken(session.access_token)
      .subscribe(
        {
          next: (res: BookRegister[]) => {
            this.books = res;
          },
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
          this.selectOptins.unshift({
            label: 'All',
            value: '0'
          })
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
  public setSelected(event: any) {
    this.selected = this.selectOptins[event.srcElement.value];
  }
  public clickBook(event: BookRegister): void {
    this.redirectService.redirectRegisterResovler('/books/detail-book', event.id!);
  }
  public redirectCreatBook(): void {
    this.redirectService.redirectRegisterResovler('/books/register-books', BookCommon.validateId);
  }
  public ngOnDestroy(): void {
    this.subsGetBooks?.unsubscribe();
    this.subsGetCategorys?.unsubscribe();
  }
}
