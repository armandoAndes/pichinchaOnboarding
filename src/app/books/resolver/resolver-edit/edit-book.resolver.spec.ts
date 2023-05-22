import { TestBed } from '@angular/core/testing';

import { EditBookResolver } from './edit-book.resolver';

describe('EditBookResolver', () => {
  let resolver: EditBookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditBookResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
