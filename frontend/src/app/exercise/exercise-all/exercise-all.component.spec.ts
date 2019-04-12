import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseAllComponent } from './exercise-all.component';

describe('ExerciseAllComponent', () => {
  let component: ExerciseAllComponent;
  let fixture: ComponentFixture<ExerciseAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
