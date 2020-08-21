import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private allocations: any;
  private allocationSubscription = new Subject<any>();

  get watchListUrl() {
    return environment.serverUrl + 'userdata/watchlist';
  }

  get allocationsUrl() {
    return environment.serverUrl + 'userdata/allocations';
  }

  constructor(private http: HttpClient) {}

  getWatchList(): Observable<Array<any>> {
    return this.http.get(this.watchListUrl) as Observable<Array<any>>;
  }

  getAllocations(): { data: Array<any>; subscription: Subject<any> } {
    // This will return object of { data: , subscription }
    if(!this.allocations) {
      this.allocations = [];
      this.http.get(this.allocationsUrl).subscribe((data) => {
        console.log(data);
        this.allocations = data;
        this.allocationSubscription.next({
          data: this.allocations
        });
      });
    }
    return {
      subscription: this.allocationSubscription,
      data: this.allocations
    }
  }

  // getAllocationForAsset(symbol): { data: <any>; Subscriptions: Observable<any> } {
  //   let subscription = this.getAllocations().subscription.pipe(
  //     map(result => {
  //       result.data.find(alloc => this.allocationSubscription.symbol === symbol)
  //     })
  //   )
  //   return {
  //     subscription: this.allocationSubscription,
  //     data: this.allocations.data.find(alloc => this.allocationSubscription.symbol === symbol)
  //   }
  // }
}
