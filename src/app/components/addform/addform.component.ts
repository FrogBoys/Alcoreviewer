import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Beverage } from '../../models/Beverage';
import { FormControl, FormGroup } from '@angular/forms';
import { BeveragesComponent } from '../beverages/beverages.component';
import { AppComponent } from 'src/app/app.component';
import { MyBeveragesComponent } from '../my-beverages/my-beverages.component';


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
  username: string;
  userid: string;
  spinner1: boolean;
  spinner2: boolean;
  image;
  constructor(private bevService: BackendService, private mybeverages: MyBeveragesComponent){
    this.bevService.loggedIn.subscribe(response =>{
      this.loggedIn = response;
      if(response == true){
        this.bevService.user.subscribe(resp =>{
          this.username = resp['username'];
          this.userid = resp['_id'];
        });
      }
    });
  }

  addBeverage(value){//adds Beverages to database
    this.spinner1 = true;//visual element
    if(value.score > 5){ console.log('error'); }
    else{
      var data = value.apk.split(',');// splits the value taken from the APK API to make it easier for the user (making them enter less data)
      var beverage = this.beveragelist.find(x => x[2] == parseInt(data[2]));//finds the specific beverage
      if(this.imageurl != undefined){
        this.bev = {
          id: parseInt(beverage[2]),
          name: beverage[3],
          procentage: parseInt(beverage[6]),
          type: beverage[4],
          taste: value.taste,
          score: value.score,
          price: parseInt(beverage[8]),
          img: this.imageurl,
          username: this.username,
          userid: this.userid  
        };
        
        var jeff = this.bevService.addData(this.bev);
        console.log(jeff);
        
        this.mybeverages.beverages.push(this.bev);
        this.bevService.dataset = this.mybeverages.beverages;
      }
      
    }
  }

  setimageURL(value){// method that sets image in addform for easier understanding of datalist
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
      taste: new FormControl,
    }); 
    this.bevService.getAPK().subscribe(data => {this.beveragelist = data;}); //this gets the data in the datalist which is used to add to the database
    this.spinner1 = false;
    this.spinner2 = false;

  }
}
