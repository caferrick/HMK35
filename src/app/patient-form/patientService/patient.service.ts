import { Injectable } from '@angular/core';
import { ChildProcessService } from 'ngx-childprocess';
import {Observable} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {HttpClient} from '@angular/common/http';
import {FsService} from 'ngx-fs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  fileData: File = null;
  fileContent: string = '';
  fileInput: File[] = [];


  constructor(public childProcessService: ChildProcessService,
              private httpClient: HttpClient,
              private sharedService: SharedService,
              private fsService: FsService) {
  
  }




   stopRecording() {
   
       return new Promise((resolve, reject) => {

        const options: string[] = [];

        this.childProcessService.childProcess.exec('pkill arecord',
          options,
          (err, out) => {
            if (err) {
               console.log("Arecord ERROR :" + err);
              reject('ERROR ....');
            } else {
              console.log("Arecord :" + out);
              resolve(out);
            }

          });
       });
   
  
   }



   startRecording() {

       return new Promise((resolve, reject) => {

        const options: string[] = [];

        this.childProcessService.childProcess.exec('arecord -D plughw:2,0 -f S16_LE /tmp/patientForm.wav ',
          options,
          (err, out) => {
            if (err) {
               console.log("Arecord ERROR :" + err);
              reject('ERROR ....');
            } else {
              console.log("Arecord :" + out);
              resolve(out);
            }

          });
       });
   } 




  async convertAudio() {
   

    const headers = {'mimeType' : 'multipart/form-data',
                     Accept: '*/*',
                     responseType: 'json' };

    const fs = this.fsService.fs as any;
    const formData = new FormData();


    this.fileData = new File( [fs.readFileSync('/tmp/patientForm.wav')], 'patientForm.wav',  {type : 'audio/wav'} );
    formData.append('file', this.fileData.slice(0, this.fileData.size,'null'), 'patientForm.wav');

    return this.httpClient.post<any>(this.sharedService.getURI('convertAudio'), formData , { headers }).toPromise();

  }



//convertAudio(): Observable<any> {
   

//    const headers = {'mimeType' : 'multipart/form-data',
//                     Accept: '*/*',
//                     responseType: 'json' };

//    const fs = this.fsService.fs as any;
//    const formData = new FormData();


//    this.fileData = new File( [fs.readFileSync('/tmp/patientForm.wav')], 'patientForm.wav',  {type : 'audio/wav'} );
//    formData.append('file', this.fileData.slice(0, this.fileData.size,'null'), 'patientForm.wav');

//    return this.httpClient.post<any>(this.sharedService.getURI('convertAudio'), formData , { headers });

//  } 

  


  

}



