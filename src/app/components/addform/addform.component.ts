import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Beverage } from '../../models/Beverage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeveragesComponent } from '../beverages/beverages.component';
import { MyBeveragesComponent } from '../my-beverages/my-beverages.component';


@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css'],
  providers: [BackendService, BeveragesComponent], 

})
export class AddformComponent implements OnInit{
  isCollapsed = true;
  addbevForm;   
  beveragelist: any [];
  bev: Beverage;
  imageurl: any;
  loggedIn;
  username: string;
  userid: string;
  spinner1: boolean;
  spinner2: boolean;
  image;

  constructor(private Service: BackendService, private mybeverages: MyBeveragesComponent){
    this.Service.loggedIn.subscribe(response =>{
      this.loggedIn = response;
      if(response == true){
        this.Service.user.subscribe(resp =>{
          this.username = resp['username'];
          this.userid = resp['_id'];
        });
      }
    });
  }

  addBeverage(value){//adds Beverages to database
    this.spinner1 = true;//visual element
    if(value.score > 5 || value.apk == undefined || value.taste == undefined){ alert('Fyll i varje fält'); }
    else{
      var data = value.apk.split(',');// splits the value taken from the APK API to make it easier for the user (making them enter less data)
      var beverage = this.beveragelist.find(x => x[2] == parseInt(data[2]));//finds the specific beverage
      let times = this.mybeverages.beverages.filter(x => x.id === parseInt(beverage[2])).length;
      times += 1;
      this.bev = {
        id: parseInt(beverage[2]),
        name: beverage[3],
        procentage: beverage[6],
        type: {
          typename: beverage[4],
          subtype: beverage[5]
        },
        taste: value.taste,
        score: value.score,
        price: parseInt(beverage[8]),
        apk: beverage[1],
        img: this.imageurl,
        link: `https://www.systembolaget.se/` + beverage[2],
        username: this.username,
        userid: this.userid,
        timesdrunk: times,
      };
      this.Service.addData(this.bev);        
      this.mybeverages.beverages.push(this.bev);
      this.Service.dataset = this.mybeverages.beverages;
      
    }
    this.spinner1 = false;
  }

  setimageURL(value){// method that sets image in addform for easier understanding of datalist
    var id = value.apk.split(',');
    this.spinner2 = true;
    this.Service.getsingularData(id[2]).subscribe(response =>{
      this.imageurl = response;
      this.spinner2 = false;
    });
  }

  ngOnInit(): void {
    this.addbevForm = new FormGroup({ //this creates a new formgoup where data about beverages can be added
      apk: new FormControl('',Validators.required),
      score: new FormControl('',Validators.required),
      taste: new FormControl('',Validators.required),
    }); 
    this.Service.getAPK().subscribe(data => {this.beveragelist = data;}); //this gets the data in the datalist which is used to add to the database
    this.spinner1 = false;
    this.spinner2 = false;

  }
}
