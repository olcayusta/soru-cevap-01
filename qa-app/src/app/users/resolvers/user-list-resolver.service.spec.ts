import { TestBed } from '@angular/core/testing';

import { UserListResolverService } from './user-list-resolver.service';

describe('UserListResolverService', () => {
  let service: UserListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
