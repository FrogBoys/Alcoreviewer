import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeveragesComponent } from './components/beverages/beverages.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'beverages', component: BeveragesComponent },
  { path: 'header', component: HeaderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
