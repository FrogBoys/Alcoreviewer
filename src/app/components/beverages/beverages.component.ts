import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { BeverageService } from '../../services/beverage.service';
import { FilterPipe } from 'src/app/filter.pipe';


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


  constructor(private bevService:BeverageService) {
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
  }

  removeBeverage(data){
    this.bevService.deleteData(data._id).subscribe(datax =>{
      this.beverages.splice(this.beverages.find(x => x === data));
      console.log(this.beverages);     
    }, err =>{
      console.log(err);
    });
  }

  showUpdateform(){
    document.getElementById('updatebev').style.display = 'block';

  }

  updateBeverage(beverage){
    this.bevService.changeData(beverage).subscribe(response =>{

    });
  }


  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }
  counterbstars(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);
  }  
}

