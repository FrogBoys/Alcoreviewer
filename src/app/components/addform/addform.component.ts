import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Beverage } from '../../models/Beverage';
import { FormControl, FormGroup } from '@angular/forms';
import { BeveragesComponent } from '../beverages/beverages.component';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css'],
  providers: [BackendService, BeveragesComponent], 

})
export class AddformComponent implements OnInit{
  isCollapsed = true;
  beverage: any[];
  data: any;
  addbevForm;
  beverages:BeveragesComponent; 
  beveragelist: any [];
  bev: Beverage;
  imageurl: any;
  loggedIn;
  userid: string;
  spinner1: boolean;
  spinner2: boolean;

  constructor(private bevService: BackendService, private bevs: BeveragesComponent, private app: AppComponent){
    this.bevService.loggedIn.subscribe(response =>{
      this.loggedIn = response;
      if(response == true){
        this.bevService.user.subscribe(resp =>{
          this.userid = resp['_id'];
        });
      }
    });
  }

  addBeverage(value){//adds Beverages to database
    this.spinner1 = true;
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
        img: null,
        userid: this.userid

      };
      this.bevService.addData(this.bev)
      .subscribe(data =>{
        this.bevs.beverages.push(this.bev);
        this.bevService.dataset = this.bevs.beverages;
        this.bevs.refresh();
      });
    }
  }

  setimageURL(value){
    console.log(value.apk);
    var id = value.apk.split(',');
    this.spinner2 = true;
    this.bevService.getsingularData(id[2]).subscribe(response =>{
      this.imageurl = response;
      this.spinner2 = false;
    });

  }

  ngOnInit(): void {
    this.addbevForm = new FormGroup({ //this creates a new formgoup where data about beverages can be added
      apk: new FormControl,
      score: new FormControl,
      procentage: new FormControl,
      price: new FormControl,
      type: new FormControl,
      taste: new FormControl,
    }); 
    this.bevService.getAPK().subscribe(data => {this.beveragelist = data;}); //this gets the data in the datalist which is used to add to the database
    this.spinner1 = false;
    this.spinner2 = false;

  }
}
