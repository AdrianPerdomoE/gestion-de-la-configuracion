import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public chart: any;
  @Input() data!: any;
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyLineChart', {
      type: 'line', //this denotes tha type of chart
      data: this.data,

      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
