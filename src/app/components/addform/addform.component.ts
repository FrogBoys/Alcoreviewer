import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BeverageService } from '../../services/beverage.service';
import { Beverage } from '../../models/Beverage';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  APK: any [];
  bev: Beverage;
  @ViewChild('spinner') spinner: ElementRef;

  constructor(private bevservice: BeverageService, private formBuilder: FormBuilder, private bevs: BeveragesComponent) { 
    //
    this.addbevForm = new FormGroup({
      apk: new FormControl,
      score: new FormControl,
      procentage: new FormControl,
      price: new FormControl,
      type: new FormControl,
      taste: new FormControl,
    });    

  }

  addBeverage(value){
    document.getElementById('spinner').style.display = 'block';
    if(value.score > 5){ console.log('jeff'); }
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
      console.log(this.bev);      
      this.bevservice.addData(this.bev )
      .subscribe(data =>{
          this.bevs.beverages.push(this.bev);
          this.bevservice.dataset = this.bevs.beverages;
          this.bevs.refresh();
      });
    }
  }

  ngOnInit(): void {
    this.bevservice.getAPK().subscribe(data => { this.APK = data; console.log(data);});
    document.getElementById('spinner').style.display = 'none';

  }
}
