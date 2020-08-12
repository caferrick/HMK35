import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {interval, Subscription} from 'rxjs';
import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {ChildProcessService} from 'ngx-childprocess';
import {VitalsService} from '../vitals/vitals.service';
import {ReadQueueService} from '../queues/read-queue.service';
import * as annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-ekg',
  templateUrl: './ekg.component.html',
  styleUrls: ['./ekg.component.css']
})
export class EkgComponent implements OnInit {

  static ekgValue: any = 0;
  static refresh: any = 2000;

  myForm: FormGroup;

  subscription: Subscription;
  chart;
  ctx = 'myChart';


  lineChartData: ChartDataSets[] = [
    { data: []  },
  ];

  private chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };



  ekgDatasets: any[] = [{
    label: 'EKG',
    //  backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
    borderColor: this.chartColors.blue,
    fill: false,
    cubicInterpolationMode: 'monotone',
    data: []
  }];



  ekgOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowLabels: false,
    scales: {
      xAxes: [{
        ticks : {
          display: false,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        type: 'realtime',
        distribution : 'series',
        realtime: {
          duration : 20000,
          refresh : 10000,
          delay : 2000,
          onRefresh: function(chart: any) {
            chart.data.datasets.forEach(function(dataset: any) {
              dataset.data.push({
                x: Date.now(),
                y: 0,
              });
              dataset.data.push({
                x: Date.now(),
                y: EkgComponent.ekgValue
              });
            });
          },
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 20,
          display: false,
          stepsSize:30,
          min: 0,
          max: 1300,
        }
      }]

    }
  };


  ekgChartOptions: ChartOptions = this.ekgOptions;


  constructor(private fb: FormBuilder,
              private childProcessService: ChildProcessService,
              private vitalsService: VitalsService,
              private readQueueService: ReadQueueService) { }



  ngOnInit() {
    Chart.pluginService.register(annotation);

    this.chart = new Chart(this.ctx, {});

    const source = interval(1000);
//    this.subscription = source.subscribe(val => this.readHeartRateQueue());
//    this.subscription = source.subscribe(val => this.readSPO2Queue());

    this.subscription = source.subscribe(val => this.readEkgService());

  }

  readEkgService() {

    this.vitalsService.getHearRate().subscribe(data => {
      EkgComponent.ekgValue = data;
    });

  }



}
