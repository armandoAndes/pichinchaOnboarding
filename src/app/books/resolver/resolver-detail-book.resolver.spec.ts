import { TestBed } from '@angular/core/testing';

import { ResolverDetailBookResolver } from './resolver-detail-book.resolver';

describe('ResolverDetailBookResolver', () => {
  let resolver: ResolverDetailBookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResolverDetailBookResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
