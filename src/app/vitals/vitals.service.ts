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






}
