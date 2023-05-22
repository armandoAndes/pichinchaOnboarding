import { Pipe, PipeTransform } from '@angular/core';

import { BookRegister } from '../../../books/interface/books.interface';

@Pipe({
  name: 'searchMultipleCategorys',
  pure: false
})
export class SearchMultipleCategorysPipe implements PipeTransform {

  transform(value: BookRegister[], categorysSelected: string[]): BookRegister[] {
    if (categorysSelected.length > 0) {
      let booksResults: BookRegister[] = [];
      for (const book of value) {
        for (const category of categorysSelected) {
          book.category.filter(item => {
            if (item == category && !booksResults.includes(book)) {
              booksResults.push(book);
            }
          });
        }
      }
      return booksResults;
    } else {
      return value;
    }
  }
}