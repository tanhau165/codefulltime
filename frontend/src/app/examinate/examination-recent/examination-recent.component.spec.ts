import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationRecentComponent } from './examination-recent.component';

describe('ExaminationRecentComponent', () => {
  let component: ExaminationRecentComponent;
  let fixture: ComponentFixture<ExaminationRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
