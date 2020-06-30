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

}
