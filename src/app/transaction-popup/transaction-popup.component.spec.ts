import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPopupComponent } from './transaction-popup.component';

describe('TransactionPopupComponent', () => {
  let component: TransactionPopupComponent;
  let fixture: ComponentFixture<TransactionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
