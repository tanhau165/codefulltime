import { TestBed } from '@angular/core/testing';

import { IsAdminService } from './is-admin.service';

describe('IsAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsAdminService = TestBed.get(IsAdminService);
    expect(service).toBeTruthy();
  });
});
