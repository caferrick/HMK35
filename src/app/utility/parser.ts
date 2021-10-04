
import {PatientInfo} from '../models/patientInfo';
import {SharedService} from '../services/shared.service';

export class Parser {

    infoMap = new Map();

   constructor() {

   }


  parseInput( textToParse: string ): Map<string, string> {


   textToParse = textToParse.replace('"}', null);

   const convertedText = textToParse.split(/(name|named|DOB|date of birth|GCS|gcs|LLC|LOC|loc|GLUC|glucose|gluc|allergies|medications)/ );

   for (let idx: 1; idx < convertedText.length; idx++) {
      this.infoMap.set(convertedText[idx].toLowerCase(), convertedText[idx + 1] );
      idx++;
    }

   return this.infoMap;

 }


} // end class

