import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _transactionList = new Subject<Transaction>();
  private _allocationList = new Subject<Transaction>();

  transactionList = this._transactionList.asObservable();
  allocationList = this._allocationList.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  addTransaction(data) {
    this._transactionList.next(data.transaction);
    this._allocationList.next(data.transaction);
  }

}
