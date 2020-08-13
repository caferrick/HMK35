import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EkgComponent} from './ekg/ekg.component';


const routes: Routes = [

 {path: '', redirectTo: 'home', pathMatch: 'full'},

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ekg',
    component: EkgComponent
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
