import { TestBed } from '@angular/core/testing';

import { MyFavoriteQuestionsResolverService } from './my-favorite-questions-resolver.service';

describe('MyFavoriteQuestionsResolverService', () => {
  let service: MyFavoriteQuestionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFavoriteQuestionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
