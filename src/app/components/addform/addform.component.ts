import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BeverageService } from '../../services/beverage.service';
import { Beverage } from '../../models/Beverage';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BeveragesComponent } from '../beverages/beverages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css'],
  providers: [BeverageService, BeveragesComponent], 

})
export class AddformComponent implements OnInit{
  isCollapsed = true;
  beverage: any[];
  data: any;
  addbevForm;
  beverages:BeveragesComponent; 
  subscription: Subscription;
  beveragelist: any [];
  bev: Beverage;
  imageurl: any;
  @ViewChild('spinner') spinner: ElementRef;
  @ViewChild('spinner2') spinner2: ElementRef;

  constructor(private bevservice: BeverageService, private formBuilder: FormBuilder, private bevs: BeveragesComponent) {}

  addBeverage(value){
    document.getElementById('spinner').style.display = 'block';
    if(value.score > 5){ console.log('error'); }
    else{
      var data = value.apk.split(',');     
      this.bev = {
        id: parseInt(data[2]),
        name: data[3],
        procentage: parseInt(data[6]),
        type: data[4],
        taste: value.taste,
        score: value.score,
        price: parseInt(data[8]),
        img: null

      };
      this.bevservice.addData(this.bev)
      .subscribe(data =>{
          this.bevs.beverages.push(this.bev);
          this.bevservice.dataset = this.bevs.beverages;
          this.bevs.refresh();
      });
    }
  }
  setimageURL(value){
    console.log(value.apk);
    var id = value.apk.split(',');
    document.getElementById('spinner2').style.display = 'block';
    this.bevservice.getsingularData(id[2]).subscribe(response =>{
      this.imageurl = response;
      document.getElementById('spinner2').style.display = 'none';
    });

  }

  
  ngOnInit(): void {
    this.addbevForm = new FormGroup({
      apk: new FormControl,
      score: new FormControl,
      procentage: new FormControl,
      price: new FormControl,
      type: new FormControl,
      taste: new FormControl,
    });          

    this.bevservice.getAPK().subscribe(data => { 
      this.beveragelist = data; 
    });
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('spinner2').style.display = 'none';

  }
}
