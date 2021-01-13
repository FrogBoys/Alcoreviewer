import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
     

@Component({
  selector: 'app-beverages',
  templateUrl: './beverages.component.html',
  styleUrls: ['./beverages.component.css'],
  providers: [BackendService]
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

  constructor(private Service:BackendService, private app: AppComponent){   
    this.Service.loggedIn.subscribe(response =>{//call to get loggedIn
      this.loggedIn = response;//loggedIn set as response
    });
  }   

  ngOnInit(): void {
    this.updateForm = new FormGroup({//formgroup initializing
      score: new FormControl,      
    });   

    this.Service.getData().subscribe(data =>{//call to get all beverages
      this.filter = this.filterdata;//setting what the filter will be using to filter
      this.beverages = data;
    }, err =>{//error handling
      console.log(err);
    });   
    this.app.getlogin();
  }

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  } 
}

