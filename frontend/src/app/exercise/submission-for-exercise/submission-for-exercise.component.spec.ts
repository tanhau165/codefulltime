import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionForExerciseComponent } from './submission-for-exercise.component';

describe('SubmissionForExerciseComponent', () => {
  let component: SubmissionForExerciseComponent;
  let fixture: ComponentFixture<SubmissionForExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionForExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionForExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
