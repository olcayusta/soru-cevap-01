import { TestBed } from '@angular/core/testing';

import { UserQuestionsResolverService } from './user-questions-resolver.service';

describe('UserQuestionsResolverService', () => {
  let service: UserQuestionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserQuestionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
