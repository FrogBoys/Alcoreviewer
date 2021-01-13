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
  mostdrunk;
  usermode;

  constructor(private Service:BackendService, private app: AppComponent){  }   

  ngOnInit(): void {
    this.updateForm = new FormGroup({           
      score: new FormControl,      
    });   
    if(this.app.user['usertype'] == 'admin'){//this determines if admintools are seen
      this.Service.getData().subscribe(data =>{//this gets all the beverages in the db 
      this.filter = this.filterdata;
      this.beverages = data;
      this.adminmode = true;//this shows the Admin-Tools Ccomponent
      },err =>{//error handling
        console.log(err);
      });         
    }
    else{
      this.userid = this.app.user['_id'];
      this.Service.getmyData(this.userid).subscribe(data =>{// this gets only the suers beverages in the db
        this.filter = this.filterdata;
        this.beverages = data;
        if(data.length != 0){//if the users beverages are less than 1 a most drunk visual indicator is hidden 
          this.usermode = true;//visual indicator is shown
          let max = 0;
          data.forEach(element => {//foreach loop that calculates which drink has been entered the most
            if(element.timesdrunk > max){
              max = element.timesdrunk;
              this.mostdrunk = element;
            }
          });
        }
        
        
      }, err =>{//error handling
      console.log(err);
      });         
    }

  }

  removeBeverage(data){//removes beverage method
    this.Service.removeData(data._id).subscribe(datax =>{//db removal of specific beverage
      this.beverages.splice(data);// local removal of beverage
    }, err =>{
      console.log(err);//error handling
    });
  }

  showUpdateform(value){//method to show specific updateform for a beverage
    document.getElementById(value.name).style.display = 'block';
    document.getElementById(value.id).style.display = 'block';
    document.getElementById(value._id).style.display = 'none';
  }

  Updateform(beverage){//
    var value = document.getElementById('score' + beverage._id) as HTMLInputElement;// this gets the value from the slider which changed the score
    let val = {score : parseInt(value.value)};
    if(val === null) val = beverage.score;
    this.Service.changeData(val, beverage._id).subscribe(respone =>{ });//Service call to update db data
  } 

  counter(i: number) {//add array to loop star icons based on scores take from //https://stackoverflow.com/questions/46805343/angular-how-to-loop-for-numbers
    return new Array(i);// new array with i objects
  }
}

