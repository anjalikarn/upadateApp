import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../api.service';
import { Statistic } from '../statistic';

@Component({
  selector: 'app-cases-stat',
  templateUrl: './cases-stat.component.html',
  styleUrls: ['./cases-stat.component.scss']
})
export class CasesStatComponent implements OnInit {

  stats: Statistic[] = [];
  label = 'Positive';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [], backgroundColor: [], label: this.label }];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getStatistic(this.label);
  }

  getStatistic(status: string) {
    debugger;
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.api.getStatistic(status)
    .subscribe((res: any) => {
      //alert(JSON.stringify(res))
      this.stats = res.data;
      const chartdata: number[] = [];
      const chartcolor: string[] = [];
      this.stats.forEach((stat) => {
        this.barChartLabels.push(stat.date);
        chartdata.push(stat.count);
        if (this.label === 'Positive') {
          chartcolor.push('rgba(255, 165, 0, 0.5)');
        } else if (this.label === 'Dead') {
          chartcolor.push('rgba(255, 0, 0, 0.5)');
        } else {
          chartcolor.push('rgba(0, 255, 0, 0.5)');
        }
      });
      this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }


  /*getStatistic(status: string) {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
      const chartcolor: string[] = [];
      this.barChartLabels = ['January', 'February', 'Mars', 'April'];
      const chartdata: number[] = ['20', '25', '30', '40'];
      //chartdata = ['20', '25', '30', '40'];
      
        if (this.label === 'Positive') {
          chartcolor.push('rgba(255, 165, 0, 0.5)');
        } else if (this.label === 'Dead') {
          chartcolor.push('rgba(255, 0, 0, 0.5)');
        } else {
          chartcolor.push('rgba(0, 255, 0, 0.5)');
        }
   
      this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
      this.isLoadingResults = false;
   
  }*/


  changeStatus() {
    this.isLoadingResults = true;
    this.getStatistic(this.label);
  }
}
