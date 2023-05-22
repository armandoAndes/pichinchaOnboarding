import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BookRegister } from '../../interface/books.interface';

@Component({
  selector: 'app-preview-book',
  templateUrl: './preview-book.component.html',
  styleUrls: ['./preview-book.component.scss']
})
export class PreviewBookComponent implements OnInit {
  @Input() public book: BookRegister | undefined;
  @Output() clickAction = new EventEmitter();
  public stateOver: boolean = false;
  constructor() { }

  public ngOnInit(): void {
  }
  public over(): void {
    this.stateOver = true;
  }
  public leave(): void {
    this.stateOver = false;
  }
  public click(): void {
    this.clickAction.emit(this.book)
  }
}
