import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as Highcharts from 'highcharts';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  dailyAggregatedPrices = [];
  dailyDetailedPrices = [];
  yearlyAggregatedPrices = [];
  yearlyDetailedPrices = [];
  symbol: string = "ACME";
  updateFlag: boolean = false;
  dailyAggregatedStartDate: number;
  dailyDetailedStartDate: number;
  yearlyAggregatedStartDate: number;
  yearlyDetailedStartDate: number;
  stockList = [];
  yearly: boolean = false;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Price'
      },
    },
    series: [
      {
        name: 'detailed',
        data: this.dailyDetailedPrices,
        type: 'line',
        pointInterval: 300000, // five minutes
        pointStart: Date.UTC(2020, 1, 1)
      },
      {
        name: 'aggregated',
        data: this.dailyAggregatedPrices,
        type: 'line',
        pointInterval: 3600000, // one hour
        pointStart: Date.UTC(2020, 1, 1)
      }
    ]
  };

  get dailyStockPricesUrl() { return environment.serverUrl + "/stocks/" + this.symbol + "/price/today"; }

  get yearlyStockPricesUrl() { return environment.serverUrl + "/stocks/" + this.symbol + "/price/yearly"; }

  get stockUrl() { return environment.serverUrl + "/stocks"; }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDailyStockPrices();
    this.getStockList();
  }

  update() {
    this.dailyAggregatedPrices = [];
    this.dailyDetailedPrices = [];
    this.yearlyAggregatedPrices = [];
    this.yearlyDetailedPrices = [];
    if (this.yearly === false) {
      this.getDailyStockPrices();

    } else {
      this.getYearlyStockPrices();
    }
  }

  setSymbol(symbol: string) {
    this.symbol = symbol;
    this.update();
  }

  getStockList(): void {
    this.http.get<any[]>(this.stockUrl).subscribe(data => {
      data.forEach(stock => this.stockList.push(stock));
    });
  }

  getDailyStockPrices() {
    this.http.get<any>(this.dailyStockPricesUrl).subscribe(data => {
      this.updateDaily(data.detailed[0].date, data.aggregated[0].date);

      data.aggregated.forEach(point => {
        this.dailyAggregatedPrices.push(Math.round(point.price * 1000) / 1000)
      })
      data.detailed.forEach(point => {
        this.dailyDetailedPrices.push(Math.round(point.price * 1000) / 1000)
      })
      this.updateFlag = true;
    });
  }

  updateDaily(detailStart, aggregateStart) {
    this.dailyDetailedStartDate = Date.UTC(detailStart.substring(0, 4), detailStart.substring(5, 7) - 1, detailStart.substring(8, 10));
    this.dailyAggregatedStartDate = Date.UTC(aggregateStart.substring(0, 4), aggregateStart.substring(5, 7) - 1, aggregateStart.substring(8, 10));
    this.chartOptions.series = [{
        name: 'detailed',
        data: this.dailyDetailedPrices,
        type: 'line',
        pointInterval: 300000, // five minutes
        pointStart: this.dailyDetailedStartDate
      },
      {
        name: 'aggregated',
        data: this.dailyAggregatedPrices,
        type: 'line',
        pointInterval: 3600000, // one hour
        pointStart: this.dailyAggregatedStartDate
      }
    ];
  }

  getYearlyStockPrices() {
    this.http.get<any>(this.yearlyStockPricesUrl).subscribe(data => {
      this.updateYearly(data.detailed[0].date, data.aggregated[0].date);

      data.aggregated.forEach(point => {
        this.yearlyAggregatedPrices.push(Math.round(point.price * 1000) / 1000)
      })
      data.detailed.forEach(point => {
        this.yearlyDetailedPrices.push(Math.round(point.price * 1000) / 1000)
      })
      this.updateFlag = true;
    });
  }

  updateYearly(detailStart, aggregateStart) {
    this.yearlyDetailedStartDate = Date.UTC(detailStart.substring(0, 4), detailStart.substring(5, 7) - 1, detailStart.substring(8, 10));
    this.yearlyAggregatedStartDate = Date.UTC(aggregateStart.substring(0, 4), aggregateStart.substring(5, 7) - 1, aggregateStart.substring(8, 10));
    this.chartOptions.series = [{
        name: 'detailed',
        data: this.yearlyDetailedPrices,
        type: 'line',
        pointInterval: 86400000, // One day
        pointStart: this.yearlyDetailedStartDate
      },
      {
        name: 'aggregated',
        data: this.yearlyAggregatedPrices,
        type: 'line',
        pointInterval: 2592000000, // One month
        pointStart: this.yearlyAggregatedStartDate
    }];
  }

  dailyOrYearly(value){
    if (value === 'yearly') {
      this.yearly = true;
      this.update();
    }
  }
}
