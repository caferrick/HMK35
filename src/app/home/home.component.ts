import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription, interval} from 'rxjs';
import {ReadQueueService} from '../queues/read-queue.service';
import {ChildProcessService} from 'ngx-childprocess';
import 'chartjs-plugin-streaming';
import { BaseChartDirective} from 'ng2-charts';
import {ChartOptions, ChartDataSets} from 'chart.js';
import {Chart} from 'chart.js';
import * as annotation from 'chartjs-plugin-annotation';
import {VitalsService} from '../vitals/vitals.service';


@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {


//  @ViewChild(BaseChartDirective,null )
//  public lineChart: BaseChartDirective;

  static heartRate: any = 0;
  static spo2: any = 0;
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

  hrDatasets: any[] = [{
    label: 'Heart Rate',
    //  backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
    borderColor: this.chartColors.blue,
    fill: false,
    cubicInterpolationMode: 'monotone',
    data: []
  }];


  spo2Datasets: any[] = [{
    label: 'Oxygen',
    //  backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
    borderColor: this.chartColors.blue,
    fill: false,
    cubicInterpolationMode: 'monotone',
    data: []
  }];



  hrOptions: any = {
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
          refresh : HomeComponent.refresh,
          delay : 2000,
          onRefresh: function(chart: any) {
            chart.data.datasets.forEach(function(dataset: any) {
              dataset.data.push({
                x: Date.now(),
                y: 0,
              });
              dataset.data.push({
                x: Date.now(),
                y: HomeComponent.heartRate
              });
            });
          },
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 10,
          display: false,
          stepsSize:30,
          min: 0,
          max: 160,
        }
      }]

    }
  };


  spo2Options: any = {
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
          refresh : HomeComponent.refresh,
          delay : 2000,
          onRefresh: function(chart: any) {
            chart.data.datasets.forEach(function(dataset: any) {
              dataset.data.push({
                x: Date.now(),
                y: 40,
              });
              dataset.data.push({
                x: Date.now(),
                y: HomeComponent.spo2
              });
            });
          },
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 10,
          display: false,
          stepsSize:30,
          min: 60,
          max: 110,
        }
      }]

    }
  };






  hrChartOptions: ChartOptions = this.hrOptions;
  spo2ChartOptions: ChartOptions  = this.spo2Options;


  constructor(  private fb: FormBuilder,
                private childProcessService: ChildProcessService,
                private vitalsService: VitalsService,
                private readQueueService: ReadQueueService) {

    this.myForm = fb.group({
      heartRate: ['0'],
      SPO2: [''],
      bloodPressure: ['0/0'],
      oxygenLevel: ['0'],
      temperature: ['0']
    });


  } // end constructor


  randomScalingFactor() {
    return (Math.random() > 0.5 ? 20.0 : -1.0) * Math.round(Math.random() * 100);
  }




  ngOnInit() {
    Chart.pluginService.register(annotation);

    this.chart = new Chart(this.ctx, {});

    const source = interval(2000);
    this.subscription = source.subscribe(val => this.readHeartRateQueue());
    this.subscription = source.subscribe(val => this.readSPO2Queue());
    this.subscription = source.subscribe(val => this.readIrTempQueue());


 //   this.subscription = source.subscribe(val => this.readHeartRateService());
 //   this.subscription = source.subscribe(val => this.readSpo2Service());


  }


   readHeartRateService() {

     this.vitalsService.getHearRate().subscribe(data => {
       HomeComponent.heartRate = data;
       HomeComponent.refresh = 1000;
       this.myForm.get('heartRate').setValue(data);
     });

   }


  readSpo2Service() {

    this.vitalsService.getSpo2().subscribe( data => {
      HomeComponent.spo2 = data;
      HomeComponent.refresh = 1000;
      this.myForm.get('SPO2').setValue(data);
    });


  }





  readHeartRateQueue() {

     this.readQueueService.getHeartRate().then(
      (val) => {
        HomeComponent.heartRate = val;
        HomeComponent.refresh = 1000;
        this.myForm.get('heartRate').setValue(val);
      },
      (err) => {
        this.myForm.get('heartRate').setValue(-1);
      }
    );

  }

  readSPO2Queue() {

      this.readQueueService.getSPO2().then(
        (val) => {
          HomeComponent.spo2 = val;
          this.myForm.get('SPO2').setValue(val);
        },
        (err) => {
        this.myForm.get('SPO2').setValue(-1);
        }
      );

    }

  readIrTempQueue() {

    this.readQueueService.getIrTemp().then(
        (val) => {
          //HomeComponent.spo2 = val;
          this.myForm.get('temperature').setValue(val);
        },
        (err) => {
          this.myForm.get('temperature').setValue(-1);
        }
    );

  }






} // end class
