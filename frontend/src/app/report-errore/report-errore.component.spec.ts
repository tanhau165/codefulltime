import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportErroreComponent } from './report-errore.component';

describe('ReportErroreComponent', () => {
  let component: ReportErroreComponent;
  let fixture: ComponentFixture<ReportErroreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportErroreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportErroreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
