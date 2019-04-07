import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExaminationComponent } from './add-examination.component';

describe('AddExaminationComponent', () => {
  let component: AddExaminationComponent;
  let fixture: ComponentFixture<AddExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
