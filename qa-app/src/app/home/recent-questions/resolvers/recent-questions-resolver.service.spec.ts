import { TestBed } from '@angular/core/testing';

import { RecentQuestionsResolverService } from './recent-questions-resolver.service';

describe('RecentQuestionsResolverService', () => {
  let service: RecentQuestionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentQuestionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
