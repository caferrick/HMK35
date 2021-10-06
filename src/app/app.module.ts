import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {ReadQueueService} from './queues/read-queue.service';
import {NgxChildProcessModule} from 'ngx-childprocess';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import {ChartsModule, ThemeService} from 'ng2-charts';
import { SharedService} from './services/shared.service';
import { VitalsService} from './vitals/vitals.service';
import { EkgComponent } from './ekg/ekg.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import {NgxFsModule} from 'ngx-fs';
import {PatientService} from './patient-form/patientService/patient.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EkgComponent,
    PatientFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    AppMaterialModule,
    HttpClientModule,
    NgxChildProcessModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxFsModule
  ],
  providers: [
    ReadQueueService,
    SharedService,
    VitalsService,
    ThemeService,
    PatientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
