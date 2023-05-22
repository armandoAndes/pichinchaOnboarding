import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BookRegister } from '../../interface/books.interface';

import { DetailsBookLabels } from '../../labels/details-book.labels';

import { RedirectService } from 'src/app/shared/services/redirect.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.scss']
})
export class DetailsBookComponent implements OnInit {
  public book: BookRegister | undefined;
  public detailsLabels = DetailsBookLabels;
  constructor(public location: Location, public activateRoute: ActivatedRoute, public redirect: RedirectService) {

  }

  public ngOnInit(): void {
    this.book = this.activateRoute.snapshot.data['bookId'];
  }
  public back(): void {
    this.location.back();
  }
  public edit(): void {
    this.redirect.redirectRegisterResovler('/books/register-books',this.book?.id!)
  }
}
