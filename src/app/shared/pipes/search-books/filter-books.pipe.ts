import { Pipe, PipeTransform } from '@angular/core';

import { BookRegister } from '../../../books/interface/books.interface';

@Pipe({
  name: 'filterBooks'
})
export class FilterBooksPipe implements PipeTransform {

  transform(value: BookRegister[], args: string): BookRegister[] {
    if (args.length > 0) {
      const booksResults: BookRegister[] = [];
      for (const book of value) {
        if (book.title.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > -1) {
          booksResults.push(book);
        }
      }
      return booksResults;
    } else {
      return value;
    }

  }

}
