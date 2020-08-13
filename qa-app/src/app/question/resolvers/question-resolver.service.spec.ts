import { TestBed } from '@angular/core/testing';

import { QuestionResolverService } from './question-resolver.service';

describe('QuestionResolverService', () => {
  let service: QuestionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
