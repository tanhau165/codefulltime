import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSubmitComponent } from './exercise-submit.component';

describe('ExerciseSubmitComponent', () => {
  let component: ExerciseSubmitComponent;
  let fixture: ComponentFixture<ExerciseSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
