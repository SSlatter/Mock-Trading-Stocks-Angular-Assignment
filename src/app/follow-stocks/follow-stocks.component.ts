import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'follow-stocks',
  templateUrl: './follow-stocks.component.html',
  styleUrls: ['./follow-stocks.component.css']
})
export class FollowStocksComponent implements OnInit {
  followedStockSymbol = 'ACME';
  StockList = [];
  UserData = []
  WatchList = [];
  
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getWatchList();
    this.getStockList();
  }

  ngOnInit(): void { }

  getWatchList(): void {
    this.http.get<any>('https://demomocktradingserver.azurewebsites.net/userdata', {
      headers: {
        userid: this.authService.getUserId()
      }
    }).subscribe(data => {
      this.UserData = data;
      if (data.watchList.length > 0) data.watchList.forEach(stock => this.WatchList.push(stock))
    });
  }

  getStockList(): void {
    this.http.get<any[]>('https://demomocktradingserver.azurewebsites.net/stocks').subscribe(data => {
      data.forEach(stock => this.StockList.push(stock));
    });
  }

  openStockListModal() { document.getElementById("modal").style.display = 'block'; }

  closeStockListModal() { document.getElementById("modal").style.display = 'none'; }

  setFollowedStock(stock: any) { console.log(stock); this.followedStockSymbol = stock; }

  followStock() {
    console.log('Adding ' + this.followedStockSymbol);
    let body = { symbol: this.followedStockSymbol, action: "ADD" }

    if (this.WatchList.find(stock => stock.symbol === this.followedStockSymbol) === undefined) {
      this.http.post('https://demomocktradingserver.azurewebsites.net/userdata/watchlist', 
        body, {
          headers: {
            userid: this.authService.getUserId()
          }
        }).subscribe(data => {
          console.log(data);
        });
      this.WatchList.push({ symbol: this.followedStockSymbol });
    }

    this.closeStockListModal();
  }

  unfollowStock(sybmol: string) {
    console.log('Removing ' + sybmol);
    let body = { symbol: sybmol, action: "REMOVE" }

    this.http.post('https://demomocktradingserver.azurewebsites.net/userdata/watchlist',
      body, {
        headers: {
          userid: this.authService.getUserId()
        }
      }).subscribe(data => console.log(data));
      
      this.WatchList = this.WatchList.filter(stock => stock.symbol !== sybmol);
  }

}
