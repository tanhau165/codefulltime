import { TestBed } from '@angular/core/testing';

import { ExamminationServiceService } from './exammination-service.service';

describe('ExamminationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamminationServiceService = TestBed.get(ExamminationServiceService);
    expect(service).toBeTruthy();
  });
});
