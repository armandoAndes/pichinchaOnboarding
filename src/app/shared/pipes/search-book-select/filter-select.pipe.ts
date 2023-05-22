import { Pipe, PipeTransform } from '@angular/core';

import { BookRegister } from '../../../books/interface/books.interface';

@Pipe({
  name: 'filterSelect'
})

export class FilterSelectPipe implements PipeTransform {

  transform(value: BookRegister[], args: string): BookRegister[] {
    if (args.length > 0 && args != '0') {
      const booksResults: BookRegister[] = [];
      for (const book of value) {
        for (const id of book.category) {
          if (id == args) {
            booksResults.push(book);
          }
        }
      }
      return booksResults;
    } else {
      return value;
    }

  }
}


