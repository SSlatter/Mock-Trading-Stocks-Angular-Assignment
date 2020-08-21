import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AssetsComponent } from './assets/assets.component';
import { DetailsComponent } from './details/details.component';
import { FollowStocksComponent } from './follow-stocks/follow-stocks.component';
import { FollowedStockComponent } from './followed-stock/followed-stock.component';
import { ChartComponent } from './chart/chart.component';
import { AssetsGridComponent } from './assets-grid/assets-grid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TransactionPopupComponent } from './transaction-popup/transaction-popup.component';
import { TransactionGridComponent } from './transaction-grid/transaction-grid.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssetsComponent,
    DetailsComponent,
    FollowStocksComponent,
    FollowedStockComponent,
    AssetsGridComponent,
    TransactionPopupComponent,
    TransactionGridComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
