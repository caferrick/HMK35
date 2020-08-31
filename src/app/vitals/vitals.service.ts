import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SharedService} from '../services/shared.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService,
  ) {

  }



  getHearRate(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getHearRate'), );
  }

  getSpo2(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getSpo2'), );
  }


  getEkg(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getEkg'), );
  }


  getIrTemp(): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('getIrTemp'), );
  }




}
