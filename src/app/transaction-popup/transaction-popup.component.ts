import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionInfo } from '../models/transactionInfo';
import { TransactionService } from '../services/transaction.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.css']
})
export class TransactionPopupComponent implements OnInit {
  @Input() StockList: Array<any>;
  @Input() TransactionInfo: TransactionInfo;
  @Output() close = new EventEmitter<any>();
  amount: number;
  symbol: string;
  
  get transactionUrl() {
    return environment.serverUrl + '/transactions';
  }
  constructor(private http: HttpClient, private authService: AuthService, private transactionService: TransactionService) { }

  ngOnInit(): void { }

  symbolChange(selectedSymbol: string) { 
    this.TransactionInfo.symbol = selectedSymbol;
  }

  amountChange(amount: number) {
    this.TransactionInfo.amount = amount;
  }

  buyOrSell() {
    this.http.post(this.transactionUrl, this.TransactionInfo, { headers: { userid: this.authService.getUserId() } })
      .subscribe(data => this.transactionService.addTransaction(data));
    this.closePopup();
  }

  closePopup() { this.close.emit(false) }

}
