import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSubmissionComponent } from './recent-submission.component';

describe('RecentSubmissionComponent', () => {
  let component: RecentSubmissionComponent;
  let fixture: ComponentFixture<RecentSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
