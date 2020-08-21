import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedStockComponent } from './followed-stock.component';

describe('FollowedStockComponent', () => {
  let component: FollowedStockComponent;
  let fixture: ComponentFixture<FollowedStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
