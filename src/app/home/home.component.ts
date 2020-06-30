import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription, interval} from 'rxjs';
import {ReadQueueService} from '../queues/read-queue.service';
import {ChildProcessService} from 'ngx-childprocess';


@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  myForm: FormGroup;
  private timer;

  subscription: Subscription;
  intervalId: number;

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


  ngOnInit() {

    const source = interval(2000);
    this.subscription = source.subscribe(val => this.readHeartRateQueue());
    this.subscription = source.subscribe(val => this.readSPO2Queue());
  }



  readHeartRateQueue() {

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
