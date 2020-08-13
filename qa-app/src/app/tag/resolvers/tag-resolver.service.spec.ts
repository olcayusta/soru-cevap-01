import { TestBed } from '@angular/core/testing';

import { TagResolverService } from './tag-resolver.service';

describe('TagResolverService', () => {
  let service: TagResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
