import { TestBed } from '@angular/core/testing';

import { PasswordFormGuard } from './password-form.guard';

describe('PasswordFormGuard', () => {
  let guard: PasswordFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
