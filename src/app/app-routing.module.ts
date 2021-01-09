import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddformComponent } from './components/addform/addform.component';
import { BeveragesComponent } from './components/beverages/beverages.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: BeveragesComponent  },
  { path: 'beverages', component: BeveragesComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'addform', component: AddformComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
