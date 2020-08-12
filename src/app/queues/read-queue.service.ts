import { Injectable } from '@angular/core';
import { ChildProcessService } from 'ngx-childprocess';




@Injectable({
  providedIn: 'root'
})
export class ReadQueueService {

  constructor(public childProcessService: ChildProcessService ) {}




  getHeartRate() {

    return new Promise((resolve, reject) => {

      const options: string[] = [];

      this.childProcessService.childProcess.exec('/usr/queues/heartRate',
    //  this.childProcessService.childProcess.exec('/Users/ferric4/CPP-progs/queue/receiver',
        options,
        (err, out) => {
          if (err) {
            console.log("HR Errorr :" + err);
            reject('ERROR ....');
          } else {
            console.log("HR Output :" + out);
            resolve(out);
          }

        });
     });
  }



  getSPO2() {

    return new Promise((resolve, reject) => {

      const options: string[] = [];

      this.childProcessService.childProcess.exec('/usr/queues/SPO2',
 //       this.childProcessService.childProcess.exec('/Users/ferric4/CPP-progs/queue/spo2Rec',

          options,
        (err, out) => {
          if (err) {
            console.log("SPO2 Errorr :" + err);
            reject('ERROR ....');
          } else {
            console.log("SPO2 Output :" + out);
            resolve(out);
          }

        });
     });
  }


  getEKG() {

    return new Promise((resolve, reject) => {

      const options: string[] = [];

      this.childProcessService.childProcess.exec('/usr/queues/EKG',
    //  this.childProcessService.childProcess.exec('/Users/ferric4/CPP-progs/queue/spo2Rec',

        options,
        (err, out) => {
          if (err) {
            console.log("EKG Errorr :" + err);
            reject('EKG ERROR ....');
          } else {
            console.log("EKG Output :" + out);
            resolve(out);
          }

        });
    });
  }


}
