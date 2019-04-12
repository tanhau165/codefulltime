import { TestBed } from '@angular/core/testing';

import { RankServicesService } from './rank-services.service';

describe('RankServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankServicesService = TestBed.get(RankServicesService);
    expect(service).toBeTruthy();
  });
});
