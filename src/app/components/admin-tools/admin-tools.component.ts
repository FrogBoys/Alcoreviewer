import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
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
  valpassword: FormControl;
  password: FormControl;
  usertype: FormControl;

  constructor(private Service: BackendService, private mybeverages: MyBeveragesComponent) { }

  removeUser(data){
    if(confirm(`Är du säker på att du vill ta bort ${data[2]}?`)){
      this.Service.removeUser(data).subscribe(response =>{});
    }
  }

  addUser(data){
    if(confirm('Är du säker på att du vill lägga till en användare?')){
      if(data.password == data.valpassword){        
        this.Service.signUpUser(data).subscribe(response=>{
    
        });    
      }
      else{
        alert('Icke matchande lösenord')
      }
    }
  }

  removeBeverage(data){
    if(confirm(`Är du säker på att du vill ta bort drycker med termen ${data} i smak kategorin?`)){
      let beverages = this.mybeverages.beverages.filter(x => x.taste == data);
      beverages.forEach(element => {
        this.Service.removeData(element._id).subscribe(response =>{
          this.mybeverages.beverages.splice(element);
        });        
      });
    }
  }

  ngOnInit(): void {
    this.Service.getUsers().subscribe(response =>{
      this.userlist = response;
    });
    this.userform =  new FormControl;
    this.username = new FormControl;
    this.password = new FormControl;
    this.valpassword = new FormControl;
    this.beveragename = new FormControl;
    this.usertype = new FormControl;
    this.adminForm = new FormGroup({   
      userform: this.userform,
      beveragename: this.beveragename,   
      addusername: new FormControl,
      setpassword: new FormControl,
      validatepassword: new FormControl,
      usertype: this.usertype,
    });
  }

}
