import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TTAcountComponent } from './ttacount.component';

describe('TTAcountComponent', () => {
  let component: TTAcountComponent;
  let fixture: ComponentFixture<TTAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TTAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TTAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
