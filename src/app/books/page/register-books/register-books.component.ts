import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RegisterBookLabels } from '../../labels/register-book.labels';

import { CategorysInterface } from '../../../register-user/interface/categorys.interface';

import { BooksServiceService } from '../../service/books-service.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { RedirectService } from 'src/app/shared/services/redirect.service';

import { StatusFomrConrolEnum } from '../../../shared/enums/input-states.enum';
import { ResponseLoginServiceInterface } from '../../../shared/interface/response-login-service.interface';
import { RequestCreateBookInterface, ResponseCreateBookInterface } from '../../interface/response-create.interface';

import { SessionEnum } from 'src/app/shared/enums/session.enum';
import { ActivatedRoute } from '@angular/router';
import { BookCommon } from '../../enums/book-common.enum';

@Component({
  selector: 'app-register-books',
  templateUrl: './register-books.component.html',
  styleUrls: ['./register-books.component.scss']
})
export class RegisterBooksComponent implements OnInit, OnDestroy {
  public labelsRegister = RegisterBookLabels;
  public categorys: CategorysInterface[];
  public categorysSelected: number[];
  public enumsControl = StatusFomrConrolEnum;
  public subsGetCategorys: Subscription | undefined;
  public subsCreateBook: Subscription | undefined;
  public errorModal: string = '';
  public errorState: boolean = false;
  public editState: boolean = false;
  public registerForm: FormGroup = new FormGroup(
    {
      nameBook: new FormControl('', [Validators.required]),
      urlBook: new FormControl('', [Validators.required, this.validatorsService.validateUrl()]),
      summary: new FormControl('', [Validators.required]),
      nameAuthor: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required, this.validatorsService.validateUrl()]),
      categorys: new FormControl([], [this.validatorsService.validateLenghtCategorys(3)]),
      public: new FormControl(false, [Validators.required])
    }
  )
  constructor(
    public booksService: BooksServiceService, public validatorsService: ValidatorsService,
    public redirectService: RedirectService, public activateRoute: ActivatedRoute
  ) {
    this.categorys = [];
    this.categorysSelected = [];
  }

  public ngOnInit(): void {
    this.getCategorys();
  }
  public validateResolver(): void {
    if (this.activateRoute.snapshot.data['bookId'] != BookCommon.validateId) {
      const newBook: RequestCreateBookInterface = this.activateRoute.snapshot.data['bookId'];
      this.registerForm.get('nameBook')?.setValue(newBook.title);
      this.registerForm.get('urlBook')?.setValue(newBook.url);
      this.registerForm.get('summary')?.setValue(newBook.resume);
      this.registerForm.get('nameAuthor')?.setValue(newBook.author);
      this.registerForm.get('image')?.setValue(newBook.image);
      this.registerForm.get('categorys')?.setValue(newBook.category);
      this.registerForm.get('public')?.setValue(newBook.public);
      this.validateCategorysChecked();
      this.editState = true;
    }
  }
  public validateCategorysChecked(): void {
    for (let category of this.registerForm.get('categorys')?.value) {
      this.categorys[category - 1].state = true;
      this.categorysSelected.push(this.categorys[category - 1].id);
      this.registerForm.get('categorys')?.setValue(this.categorysSelected)
    }
  }
  public getCategorys(): void {
    this.subsGetCategorys = this.booksService.getCategorys()
      .subscribe(
        {
          next: (value: CategorysInterface[]) => { this.categorys = value; this.validateResolver(); },
          error: (err: any) => {
            this.errorModal = err;
            this.errorState = true;
          }
        }
      );
  }
  public setFormGroup(event: any): void {
    this.registerForm.get('public')?.setValue(event.detail.checked);
  }

  public setValueCategory(event: any, index: number) {
    if (event.detail.checked) {
      this.categorysSelected.push(this.categorys[index].id);
    } else {
      this.categorysSelected = this.categorysSelected.filter(item => item !== this.categorys[index].id)
    }
    this.registerForm.get('categorys')?.setValue(this.categorysSelected)
  }
  public createBook(): void {
    const session: ResponseLoginServiceInterface = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
    const newBook: RequestCreateBookInterface = {
      author: this.registerForm.get('nameAuthor')?.value,
      category: this.registerForm.get('categorys')?.value,
      image: this.registerForm.get('image')?.value,
      isbn13: 2,
      price: 10,
      public: this.registerForm.get('public')?.value,
      resume: this.registerForm.get('summary')?.value,
      title: this.registerForm.get('nameBook')?.value,
      url: this.registerForm.get('urlBook')?.value,
      userRegister: session.user.userId
    }
    this.subsCreateBook = this.booksService.createBook(session.access_token, newBook)
      .subscribe(
        {
          next: (response: ResponseCreateBookInterface) => {
            this.redirectService.redirectRegister('/books/profile-book');
          },
          error: (err: any) => {
            this.errorModal = err;
            this.errorState = true;
          }
        }
      );
  }

  public ngOnDestroy(): void {
    this.subsCreateBook?.unsubscribe();
    this.subsGetCategorys?.unsubscribe();
  }
  public backHome(): void {
    this.redirectService.redirectRegister('/books/home-library')
  }
}
