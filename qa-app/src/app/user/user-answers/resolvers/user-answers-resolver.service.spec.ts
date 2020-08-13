import { TestBed } from '@angular/core/testing';

import { UserAnswersResolverService } from './user-answers-resolver.service';

describe('UserAnswersResolverService', () => {
  let service: UserAnswersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnswersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
