import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { FilterPipe } from 'src/app/filter.pipe';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-my-beverages',
  templateUrl: './my-beverages.component.html',
  styleUrls: ['./my-beverages.component.css'],
  providers: [BackendService]
})
export class MyBeveragesComponent implements OnInit {
  beverages: any []; 
  bev:any [];
  star: any ;
  search: any[];
  filter: FilterPipe;
  filterdata: any;   
  updateForm;
  loggedIn;
  usertype: string;
  userid: string;
  adminmode;
  mostdrunk: any;
  usermode;

  constructor(private Service:BackendService, private app: AppComponent){      
    this.Service.loggedIn.subscribe(response => {
      this.app.loggedIn = response;
      this.app.loginforms = !response;
      this.app.logoutbtn = response;   
    });
  }   

  refresh(){
    this.beverages = new Array<any>();
    this.Service.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;  
      this.beverages = this.Service.dataset;  
    }, err =>{
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({           
      score: new FormControl,      
    });   
    if(this.app.user['usertype'] == 'admin'){
      this.Service.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
      this.adminmode = true;
      },err =>{
        console.log(err);
      });         
    }
    else{
      this.userid = this.app.user['_id'];
      this.usermode = true;
      this.Service.getmyData(this.userid).subscribe(data =>{         
        this.filter = this.filterdata;
        this.beverages = data;
        if(data != undefined){
          let max = 0;
          data.forEach(element => {
            if(element.timesdrunk > max){
              this.mostdrunk = element;
            }
          });
        }
      }, err =>{
      console.log(err);
      });         
    }

  }

  removeBeverage(data){
    this.Service.removeData(data._id).subscribe(datax =>{
      this.beverages.splice(this.beverages.find(x => x === data));
    }, err =>{
      console.log(err);
    });
  }

  showUpdateform(value){
    var form = document.getElementById(value.id);
    document.getElementById(value.name).style.display = 'block';
    document.getElementById(value.id).style.display = 'block';
    document.getElementById(value._id).style.display = 'none';
    if(form.style.display === 'block'){
      /*document.getElementById(value.name).style.display = 'none';
      document.getElementById(value.id).style.display = 'none';
      document.getElementById(value._id).style.display = 'block';*/
    }
  }

  Updateform(beverage){
    var value = document.getElementById('score' + beverage._id) as HTMLInputElement;
    let val = {score : parseInt(value.value)};
    if(val === null) val = beverage.score;
    this.Service.changeData(val, beverage._id).subscribe(respone =>{ });
  } 

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }
}

