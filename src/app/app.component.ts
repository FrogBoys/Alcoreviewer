import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BeverageService } from '../app/services/beverage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'AlcoRev';  
  constructor(){

  }

  ngOnInit(){

  } 

}
