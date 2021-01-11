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

  constructor(private bevService:BackendService, private app: AppComponent){

    this.updateForm = new FormGroup({           
      score: new FormControl,      
    });   
    if(this.app.user['_id'] == 'admin'){
      this.bevService.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
      },err =>{
        console.log(err);
      });         
      }
    else{
      this.userid = this.app.user['_id'];
      this.bevService.getmyData(this.userid).subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
      }, err =>{
      console.log(err);
      });         
    }
    
    //this.bevService.loggedIn.subscribe(response => {this.loggedIn = response;})
  }   

  refresh(){
    this.beverages = new Array<any>();
    document.location.reload();
    this.bevService.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;  
      this.beverages = this.bevService.dataset;  
    }, err =>{
      console.log(err);
    });
  }

  ngOnInit(): void {
    

  }

  removeBeverage(data){
    this.bevService.deleteData(data._id).subscribe(datax =>{
      this.beverages.splice(this.beverages.find(x => x === data));
      console.log(this.beverages);     
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
    this.bevService.changeData(val, beverage._id).subscribe(respone =>{ });
  } 

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }

  counterbstars(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }  
}

