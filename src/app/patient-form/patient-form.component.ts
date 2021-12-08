import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
//import {VitalsService} from '../vitals/vitals.service';
import { Parser} from '../utility/parser';
import { PatientInfo } from '../models/patientInfo';
import { PatientService} from './patientService/patient.service';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  dataMap = new Map();
  myForm: FormGroup;
  parser: Parser = new Parser();

  displayRecording = false;
  displayProcessing = false;

  constructor( private fb: FormBuilder,
               private patientService : PatientService) {

    this.myForm = fb.group({
      name: [''],
      dob: [''],
      gcs: [''],
      loc: [''],
      glucose: [''],
      allergies: [''],
      meds:['']
    });


  } // end constructor

  ngOnInit() {

  }


  startRecording() {

    this.displayRecording = true;
    this.displayProcessing = false;

      this.patientService.startRecording().then(
        (val) => {
          ;
        },
        (err) => {
          ;
        }
      );

 }





  stopRecording() {

    this.displayRecording = false;
    this.displayProcessing = true;


    this.patientService.stopRecording();
    this.patientService.convertAudio().then(data => {

      console.log("stopRecording Data : "+ JSON.stringify(data));
      this.dataMap = this.parser.parseInput(JSON.stringify(data));
      console.log("DataMap : "+ JSON.stringify(this.dataMap));

      this.setName();
      this.setDOB();
      this.setGCS();
      this.setAllergies();
      this.setLOC();
      this.setGlucose();
      this.setMeds();

      this.displayProcessing = false;

    });

  }



   setName() {

     const dataFields = ['name', 'named'];

       for(let i=0; i < dataFields.length; i++) {

         if (this.dataMap.has(dataFields[i]) === true ) {
           this.myForm.get('name').setValue(this.dataMap.get(dataFields[i]) );
           console.log('Name :'+ this.dataMap.get(dataFields[i]) );
           break;
         }

       }


   }


   setDOB() {
     const dataFields = ['dob', 'date of birth'];

       for(let i=0; i < dataFields.length; i++) {

         if (this.dataMap.has(dataFields[i]) === true ) {
           this.myForm.get('dob').setValue(this.dataMap.get(dataFields[i]) );
           break;
         }

       }
   }

   setLOC() {
     const dataFields = ['loc', 'llc'];

     for(let i=0; i < dataFields.length; i++) {

       if ( this.dataMap.has(dataFields[i]) === true ) {
         this.myForm.get('loc').setValue(this.dataMap.get(dataFields[i]) );
         break;
       }
     }

   }

  setGCS() {
    const dataFields = ['GCS','gcs'];

    for(let i=0; i < dataFields.length; i++) {

      if(this.dataMap.has(dataFields[i]) === true) {
        this.myForm.get('gcs').setValue(this.dataMap.get(dataFields[i]) );
        break;
      }
    }

  }


  setGlucose() {
    const dataFields = ['gluc', 'glucose'];

    for (var i=0; i < dataFields.length; i++) {

      if ( this.dataMap.has(dataFields[i]) === true ) {
        this.myForm.get('glucose').setValue(this.dataMap.get(dataFields[i]) );
        break;
      }
    }
  }

  setAllergies() {
    const dataFields = ['allergies'];

    for (let i=0; i < dataFields.length; i++) {

      if (this.dataMap.has(dataFields[i]) === true) {
        this.myForm.get('allergies').setValue(this.dataMap.get(dataFields[i]) );
        break;
      }

    }
  }

  setMeds() {
    const dataFields = ['meds', 'medications', 'med','medication'];

    for (let i=0; i < dataFields.length; i++) {

      if (this.dataMap.has(dataFields[i]) === true) {
        this.myForm.get('meds').setValue(this.dataMap.get(dataFields[i]) );
        break;
      }

    }

  }


}
