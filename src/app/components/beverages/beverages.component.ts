import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
     

@Component({
  selector: 'app-beverages',
  templateUrl: './beverages.component.html',
  styleUrls: ['./beverages.component.css']
})
export class BeveragesComponent implements OnInit{
  beverages: any []; 
  bev:any [];
  star: any ;
  search: any[];
  filter: FilterPipe;
  filterdata: any;   
  updateForm;
  loggedIn;

  constructor(private bevService:BackendService, private app: AppComponent){
    this.bevService.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
    }, err =>{
      console.log(err);
    }); 
    this.bevService.loggedIn.subscribe(response => {
      this.loggedIn = response; 
      this.app.loggedIn = response;
      this.app.loginforms = !response;
      this.app.logoutbtn = response;
    })
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
    this.updateForm = new FormGroup({           
      score: new FormControl,      
    });   

    this.bevService.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
    }, err =>{
      console.log(err);
    });   
    this.app.getlogin();

  }

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }

  counterbstars(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }  
}

