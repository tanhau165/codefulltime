import { TestBed } from '@angular/core/testing';

import { TeacherAdminService } from './teacher-admin.service';

describe('TeacherAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherAdminService = TestBed.get(TeacherAdminService);
    expect(service).toBeTruthy();
  });
});
