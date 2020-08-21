import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from '../services/transaction.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { TransactionInfo } from '../models/transactionInfo';
import { Transaction } from '../models/transaction';
import { ArgumentType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-assets-grid',
  templateUrl: './assets-grid.component.html',
  styleUrls: ['./assets-grid.component.css']
})
export class AssetsGridComponent implements OnInit {
  allocationList: any = [];
  @Input() TransactionInfo: TransactionInfo;
  sellBool: Boolean = false;
  amount: number;
  symbol: string;
  StockList = [];
  transaction: any;
  
  get allocationUrl() {
    return environment.serverUrl + "/userdata/allocations";
  }

  constructor(
    private http: HttpClient, 
    private transactionService: TransactionService,
    private authService: AuthService) { 
    transactionService.allocationList.subscribe(data => {
      this.updateAllocationList(data);
    });
  }

  ngOnInit(): void {
    this.getAllocationHistory();
    this.getStockList();
  }

  updateAllocationList(data: any) {
    this.allocationList.forEach(stock => {
      if (stock.symbol === data.symbol) {
        stock.amount = stock.amount - data.amount;
        stock.price = data.tickPrice;
        stock.total = stock.total - data.cost;
      }
    })
  }

  getStockList(): void {
    this.http.get<any[]>('https://demomocktradingserver.azurewebsites.net/stocks').subscribe(data => {
      this.StockList = data;
    });
  }

  setStockList() {
    this.http.get<any>(this.allocationUrl, {
      headers: {
        userid: this.authService.getUserId()
      }
    }).subscribe(data => {
      this.allocationList = data;
    });
  }

  getAllocationHistory() {
    this.http.get<any>(this.allocationUrl, {
      headers: {
        userid: this.authService.getUserId()
      }
    }).subscribe(data => {
      data.forEach(stock => {
        this.http.get<any>('https://demomocktradingserver.azurewebsites.net/stocks/' + stock.symbol + '/price')
          .subscribe(data => {
            this.allocationList.push({
              symbol: stock.symbol,
              amount: stock.amount,
              price: data.price,
              total: stock.amount * data.price
            })
          })
      })
    });
  }

  sellStock() {
    this.TransactionInfo = new TransactionInfo({
      side: 'sell',
      symbol: 'ACME',
      amount: 10
    })
    this.sellBool = true;
  }

  closeSell(bool: Boolean) {
    this.sellBool = bool;
  }

}
