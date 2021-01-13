import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { MyBeveragesComponent } from '../my-beverages/my-beverages.component';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
  isCollapsed = true;
  isCollapsedAddUser = true;
  userlist: any[];
  adminForm: FormGroup;
  userform: FormControl;
  username: FormControl;
  beveragename: FormControl;

  constructor(private Service: BackendService, private mybeverages: MyBeveragesComponent) { }

  removeUser(data){
    if(confirm(`Är du säker på att du vill ta bort ${data[2]}?`)){//confirmation box opened to make sure the user want to perform this action
      this.Service.removeUser(data).subscribe(response =>{});//call service to remove user
    }
  }

  addUser(data){
    if(confirm('Är du säker på att du vill lägga till en användare?')){//confirmation box opened to make sure the user want to perform this action
      if(data.password == data.valpassword){//
        this.Service.signUpUser(data).subscribe(response=>{//call to service to add user
    
        });    
      }
      else{
        alert('Icke matchande lösenord');//simple call to tell the admin that the passwords doesn't match
      }
    }
  }

  removeBeverage(data){
    if(confirm(`Är du säker på att du vill ta bort drycker med termen ${data} i smak kategorin?`)){//confirmation box opened to make sure the user want to perform this action
      let beverages = this.mybeverages.beverages.filter(x => x.taste == data);//gets every beverage that has "data" as their "taste" this is to remove malicious users
      beverages.forEach(element => {
        this.Service.removeData(element._id).subscribe(response =>{// beverages is removed from db
          this.mybeverages.beverages.splice(element);//beverages is removed from local list
        });        
      });
    }
  }

  ngOnInit(): void {
    this.Service.getUsers().subscribe(response =>{//call to get all users
      this.userlist = response;//populates datalist with users that the admin may remove
    });
    this.userform =  new FormControl;
    this.username = new FormControl;
    this.beveragename = new FormControl;
    this.adminForm = new FormGroup({   
      userform: this.userform,
      beveragename: this.beveragename,   
      username: new FormControl,
      password: new FormControl,
      valpassword: new FormControl,
      usertype: new FormControl,
    });
  }

}
