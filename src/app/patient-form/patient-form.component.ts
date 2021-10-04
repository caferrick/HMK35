import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VitalsService} from '../vitals/vitals.service';
import { Parser} from '../utility/parser';
import { PatientInfo } from '../models/patientInfo';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  dataMap = new Map();
  myForm: FormGroup;
  parser: Parser = new Parser();

  constructor( private fb: FormBuilder,
               private vitalsService: VitalsService) {

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

  }

  stopRecording() {
    this.vitalsService.convertAudio().subscribe(data => {
      this.dataMap = this.parser.parseInput(JSON.stringify(data));
      this.setName();
      this.setDOB();
      this.setGCS();
      this.setAllergies();
      this.setLOC();
      this.setGlucose();
      this.setMeds();
    });
  }



   setName() {
     console.log("Name :"+ this.dataMap.get('name') );
     this.myForm.get('name').setValue(this.dataMap.get('name'));
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
    const dataFields = ['meds', 'medications', 'med'];

    for (let i=0; i < dataFields.length; i++) {

      if (this.dataMap.has(dataFields[i]) === true) {
        this.myForm.get('meds').setValue(this.dataMap.get(dataFields[i]) );
        break;
      }

    }

  }


}
