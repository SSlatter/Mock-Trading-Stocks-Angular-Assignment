import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { AuthService } from '../services/auth.service';
import { NavigationStart } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.css']
})
export class TransactionGridComponent implements OnInit {
  transactionList: any;
  subscription: Subscription;

  get transactionUrl() {
    return environment.serverUrl + '/transactions';
  }

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private transactionService: TransactionService 
  ) {
    transactionService.transactionList.subscribe(data => {
      this.transactionList.unshift(data);
    });
  }

  ngOnInit(): void {
    this.getTransactionHistory() 
  }

  getTransactionHistory() {
    this.http.get<any>(this.transactionUrl, {
      headers: {
        userid: this.authService.getUserId()
      }
    }).subscribe(data => this.transactionList = data.reverse());
  }
}
