import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {



  endPoints = [
    {URI: '/secser/x-services/userServices/authenticate', KEY :'authenticate'},
    {URI: '/secinn/rest/userAccess/getUserAttributesNonArray', KEY: 'getUser' },
    {URI: '/secinn/rest/userAdmin/unLockAccount',KEY: 'unlockUser'},
    {URI: '/secinn/rest/userServices/findUserByGroupDN', KEY: 'usersByGroup'},
    {URI: 'http://24.154.4.10:8000/HMKVitals/rest/vitals/heartRate',KEY: 'getHearRate'},
    {URI: 'http://24.154.4.10:8000/HMKVitals/rest/vitals/spo2',KEY: 'getSpo2'},
    {URI: '/secinn/rest/userServices/getExternalGroupNames',KEY: 'getExternalGroupNames'}
  ];



  constructor() { }


  /**
   * Get the uri based on the key
   * @param findKEY key to fetch uri from
   */

  getURI(findKEY: string): string {
    const val = this.endPoints.find(x => x.KEY === findKEY);
    return val.URI;
  }



}

