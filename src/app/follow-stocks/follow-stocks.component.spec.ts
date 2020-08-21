import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FollowStocksComponent } from './follow-stocks.component';
import { FollowedStockComponent } from '../followed-stock/followed-stock.component';

describe('FollowStocksComponent', () => {
  let component: FollowStocksComponent;
  let fixture: ComponentFixture<FollowStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FollowStocksComponent,
        FollowedStockComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
