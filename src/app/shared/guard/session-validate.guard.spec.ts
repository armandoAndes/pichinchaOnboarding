import { TestBed } from '@angular/core/testing';

import { SessionValidateGuard } from './session-validate.guard';

describe('SessionValidateGuard', () => {
  let guard: SessionValidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionValidateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
