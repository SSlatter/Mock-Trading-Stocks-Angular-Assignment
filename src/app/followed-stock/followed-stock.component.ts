import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionInfo } from '../models/transactionInfo';
import { UserService } from '../services/user.service';

@Component({
  selector: 'followed-stock',
  templateUrl: './followed-stock.component.html',
  styleUrls: ['./followed-stock.component.css']
})
export class FollowedStockComponent implements OnInit {
  @Input('symbol') symbol;
  @Input('StockList') StockList;
  @Output() unfollow = new EventEmitter<string>();
  TransactionInfo: TransactionInfo;
  StockInfo: any;
  BuySellBool: Boolean;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.StockInfo = {
      stock: '',
      price: 0,
      amount: 0
    };
    this.getPriceData();
  }

  getStockAmount() {
    this.http.get<any>('https://demomocktradingserver.azurewebsites.net/userdata/allocations', { headers: { userid: 'shane.slatter' } })
      .subscribe(data => {
        data.forEach(stock => {
          if (stock.symbol === this.StockInfo.stock) {
            this.StockInfo.amount = stock.amount;
          }
        })
      })
  }

  getPriceData() {
    this.http.get<any>('https://demomocktradingserver.azurewebsites.net/stocks/' + this.symbol + '/price')
      .subscribe(data => {
        this.StockInfo.stock = data.stock;
        this.StockInfo.price = data.price;
        this.getStockAmount();
      });
  }

  unfollowStock() {
    this.unfollow.emit(this.StockInfo.stock);
  }

  buySellStock(side: string) {
    this.TransactionInfo = new TransactionInfo({
      side: side,
      symbol: this.symbol,
      amount: 10
    })
    this.BuySellBool = true;
  }

  closeBuySell(bool: Boolean) {
    this.BuySellBool = bool;
  }

}
