import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SharedService} from '../services/shared.service';
import {HttpClient} from '@angular/common/http';
import {FsService} from 'ngx-fs';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  fileData: File = null;
  fileContent: string = '';
  fileInput: File[] = [];


  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService,
    private fsService: FsService
  ) {

  }



  getHearRate(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getHearRate'), );
  }

  getSpo2(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getSpo2'), );
  }



  convertAudio(): Observable<any> {

    const headers = {'mimeType' : 'multipart/form-data',
                     Accept: '*/*',
                     responseType: 'json' };

    const fs = this.fsService.fs as any;
    const formData = new FormData();


    this.fileData = new File( [fs.readFileSync('/Users/ferric4/Downloads/JohnDoe.wav')], 'JohnDoe.wav',  {type : 'audio/wav'} );
    formData.append('file', this.fileData.slice(0, this.fileData.size,'null'),  'JohnDoe.wav');

    return this.httpClient.post<any>(this.sharedService.getURI('convertAudio'), formData , { headers });

  }



}
