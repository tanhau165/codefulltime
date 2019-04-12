import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseRecentComponent } from './exercise-recent.component';

describe('ExerciseRecentComponent', () => {
  let component: ExerciseRecentComponent;
  let fixture: ComponentFixture<ExerciseRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
