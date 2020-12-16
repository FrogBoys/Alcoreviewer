import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-beverages',
  templateUrl: './beverages.component.html',
  styleUrls: ['./beverages.component.css'],
})
export class BeveragesComponent implements OnInit{
  beverages: any []; 
  bev:any [];
  star: any ;
  search: any[];
  filter: FilterPipe;
  filterdata: any;   
  updateForm;


  constructor(private bevService:BackendService) {
    this.bevService.getData().subscribe(data =>{         
      this.filter = this.filterdata;
      this.beverages = data;
    }, err =>{
      console.log(err);
    });     
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
    this.bevService.changeData(val, beverage._id).subscribe(respone =>{

    });
  } 

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }

  counterbstars(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }  
}

