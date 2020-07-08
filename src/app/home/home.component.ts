import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription, interval} from 'rxjs';
import {ReadQueueService} from '../queues/read-queue.service';
import {ChildProcessService} from 'ngx-childprocess';
import 'chartjs-plugin-streaming';
import { BaseChartDirective} from 'ng2-charts';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
import {ChartOptions} from 'chart.js';


@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {


  @ViewChild(BaseChartDirective,null )
  public lineChart: BaseChartDirective;

  myForm: FormGroup;
  private timer;

  subscription: Subscription;
  intervalId: number;

  private chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  datasets: any[] = [{
    label: 'Dataset 2 (cubic interpolation)',
  //  backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
    borderColor: this.chartColors.blue,
    fill: false,
    cubicInterpolationMode: 'monotone',
    data: []
  }];


  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime',
        distribution : 'series',
         realtime: {
          onRefresh: function(chart: any) {
             chart.data.datasets.forEach(function(dataset: any) {
               dataset.data.push({
                x: Date.now(),
                y: Math.random()
               });
             });
          },
            delay: 2000
         }
      }]
    }
  };


  constructor(  private fb: FormBuilder,
                private childProcessService: ChildProcessService,
                private readQueueService: ReadQueueService) {

    this.myForm = fb.group({
      heartRate: [''],
      SPO2: [''],
      bloodPressure: ['0/0'],
      oxygenLevel: ['0'],
      temperature: ['0']
    });


  } // end constructor


  randomScalingFactor() {
    return (Math.random() > 0.5 ? 20.0 : -1.0) * Math.round(Math.random() * 100);
  }




  onRefresh() {
  this.lineChart.chart.data.datasets.forEach(function(dataset: any) {
    dataset.data.push({
      x: Date.now(),
      y: Math.random()
    });
   });
    this.lineChart.chart.update();
  }



  ngOnInit() {

    const source = interval(2000);
    this.subscription = source.subscribe(val => this.readHeartRateQueue());
    this.subscription = source.subscribe(val => this.readSPO2Queue());
  }


  readHeartRateQueue() {

    console.log("Chart Data :"+ JSON.stringify(this.lineChart.chart) );
     this.readQueueService.getHeartRate().then(
      (val) => {
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
          this.myForm.get('SPO2').setValue(val);
        },
        (err) => {
        this.myForm.get('SPO2').setValue(-1);
        }
      );

    }


} // end class
