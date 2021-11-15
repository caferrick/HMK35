import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {ChildProcessService} from 'ngx-childprocess';
import {VitalsService} from '../vitals/vitals.service';
import {ReadQueueService} from '../queues/read-queue.service';
import * as annotation from 'chartjs-plugin-annotation';
import {Label} from 'ng2-charts';
import {Observable, Subscription, interval} from 'rxjs';


@Component({
  selector: 'app-ekg',
  templateUrl: './ekg.component.html',
  styleUrls: ['./ekg.component.css']
})
export class EkgComponent implements OnInit {

  private chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };


  subscription: Subscription;


  ekgDatasets: ChartDataSets[] = [{
    //label: 'EKG',
    //  backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
    borderColor: this.chartColors.blue,
    fill: false,
   // cubicInterpolationMode: 'monotone',
   // data: [233,474,701,919,779,545,444,532,643,579,512,392,562,586,514,502,396,557,563,516,329,232,363,449,521,197,412,531,68,507,575,534,499,531,509,528,511,523,517,518,524,509,527,506,529,505,533,507,526,511,520,519,513,525,509,550,511,406,484,60,315,234,87,42,15,10,375,399,234,52,6,1,259,98,555,341,495,415,493,403,472,316,349,452,11,483,214,19,253,269,229,15,432,555,510,502,514,513,515,514,514,514,513,514,513,514,512,515,511,517,515,515,513,510,515,512,516,511,507,523,508,521,512,518,517,513,520,510,522,508,376,286,223,148,291,108,521,143,533,236,493,411,488,508,500,572,540,549,570,507,558,506,545,503,537,500,536,503,530,511,519,1002,1002,1003,970,632,175,1002,1003,1004,1003,1002,402,447,996,1002,1003,1004,1003,47,647,864,1003,1002,480,459,1001,1003,1004,1003,685,659,1002,1003,1003,1003,874,655,128,1002,1003,1004,1003,1002,420,386,996,1002,1003,1003,1003,43,568,886,1003,1004,1003,1002,754,807,29,1002,1002,1002,1004,995,708,184,1003,1004,1004,1004,1003,428,447,997,1004,1004,1004,1004,144,728,899,34,1002,1003,1003,1003,997,776,186,1003,1004,1004,1004,1002,571,491,1000,1003,1004,1004,1004,238,822,931,75,1004,1004,1004,1004,1000,799,263,1003,1004,1003,1003,1002,545,550,999,1003,1004,1004,1004,189,803,995,133,1002,1002,1003,1002,1001,735,312,1002,1004,1004,1004,1004,380,584,985,1003,1004,1004,1004,3,739,936,64,1002,1002,1003,1002,997,800,210,1003,1004,444,155,165,269,288,194,155,288,507,607,412,122,255,499,103,565,628,650,458,48,253,478,154,578,17,623,646,595,171,432,476,271,587,149,648,61,673,82,634,161,502,391,405,545,272,594,244,641,176,650,192,600,303,485,481,408,559,290,612,272,654,197,636,284,570,386,454,531,374,580,263,622,618,317,618,364,578,430,504,521,453,558,420,586,408,598,404,588,433,541,486,492,601,506,858,367,985,390,776,448,755,553,779,810,452,996,569,1001,816,1003,916,1003,995,1003,1000,999,1002,829]
      data: []
  }];

  ekgLabels: Label[] = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];

  ekgOptions = {
    responsive: true,

  };

  ekgLegend = true;
  lineChartPlugins = [];
  ekgChartType = 'line';


  constructor(private fb: FormBuilder,
              private childProcessService: ChildProcessService,
              private readQueueService: ReadQueueService,
              private vitalsService: VitalsService ) { }



  ngOnInit() {

    const source = interval(3000);
    this.subscription = source.subscribe(val => this.readEKGQueue());
    this.readEKGQueue();

  }





  readEKGQueue() {

   // this.ekgDatasets[0].data = [233,474,701,919,779,545,444,532,643,579,512,392,562,586,514,502,396,557,563,516,329,232,363,449,521,197,412,531];

    for(let i=0; i<500; i++) {

       this.readQueueService.getEKG().then(
        (val) => {
          this.ekgDatasets[0].data.push(Number(val));
        },
        (err) => {
          this.ekgDatasets[0].data.push(-1);
        }
      );

    }

  }



}

