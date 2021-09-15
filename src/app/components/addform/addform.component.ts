import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Beverage } from '../../models/Beverage';
import { FormControl, FormGroup } from '@angular/forms';
import { BeveragesComponent } from '../beverages/beverages.component';
import { MyBeveragesComponent } from '../my-beverages/my-beverages.component';


@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css'],
  providers: [BackendService, BeveragesComponent], 

})
export class AddformComponent implements OnInit{
  isCollapsed = true; //collapse button
  addbevForm; //formgroup
  beveragelist: any []; //list of beverages
  bev: Beverage;
  imageurl: any; 
  dsplimg: boolean; 
  loggedIn; //boolean to check if the user is logged in
  username: string;
  userid: string;
  spinner1: boolean;//visual element
  spinner2: boolean;//visual element
  image;

  constructor(private Service: BackendService, private mybeverages: MyBeveragesComponent){
    this.Service.loggedIn.subscribe(response =>{ //getting the service loggedIn
      this.loggedIn = response;//loggedIn is set
      if(response == true){
        this.Service.user.subscribe(resp =>{ // getting the service user if loggedId == true
          this.username = resp['username'];//username is set
          this.userid = resp['_id'];//userid is set
        });
      }
    });
  }

  addBeverage(value){//adds Beverages to database
    this.spinner1 = true;//visual spinner1 is shown
    if(value.score > 5 || value.apk == undefined || value.taste == undefined){ alert('Fyll i varje fält'); }
    else{
      var data = value.apk.split(',');// splits the value taken from the APK API to make it easier for the user (making them enter less data)
      var beverage = this.beveragelist.find(x => x[2] == parseInt(data[2]));//finds the specific beverage
      let times = this.mybeverages.beverages.filter(x => x.id === parseInt(beverage[2])).length; // getting the amount of times a drink has been entered
      times += 1;// added 1 to the total amount
      this.bev = { // beverage object which is later added to db
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
        apk: beverage[0],
        img: this.imageurl,
        link: `https://www.systembolaget.se/` + beverage[2],
        username: this.username,
        userid: this.userid,
        timesdrunk: times,
      };
      this.Service.addData(this.bev);//Call to the service to add the beverage from nodejs
      this.mybeverages.beverages.push(this.bev);// the list beverages in the my.beverages component adds the object bev      
    }
    this.spinner1 = false;//visual spinner1 is hidden
  }

  setimageURL(value){// method that sets image in addform for easier understanding of datalist
    var id = value.apk.split(',');
    this.spinner2 = true;//visual spinner2 is shown
    this.dsplimg = false;
    this.Service.getsingularData(id[2]).subscribe(response =>{
      this.dsplimg = true;
      this.imageurl = response; //imageurl is set from getsingularData response
      this.spinner2 = false;//visual spinner2 is hidden
    });
  }

  ngOnInit(): void {
    this.addbevForm = new FormGroup({ //this creates a new formgoup where data about beverages can be added
      apk: new FormControl,
      score: new FormControl,
      taste: new FormControl,
    }); 
    this.Service.getAPK().subscribe(data => {this.beveragelist = data;}); //this gets the data in the datalist which is used to add to the database
    this.spinner1 = false;//visual spinner1 is hidden
    this.spinner2 = false;//visual spinner2 is hidden

  }
}
