import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  public chart: any;
  @Input() data:any;
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    
    this.chart = new Chart('MyBarChart', {
      type: 'bar', //this denotes tha type of chart
      data:this.data,
      options: {
        aspectRatio: 2.5,
      }
      ,
    });
  }
}
