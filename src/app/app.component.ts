import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from './services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BeveragesComponent } from './components/beverages/beverages.component';
import { AddformComponent } from './components/addform/addform.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BeveragesComponent, AddformComponent]
})
export class AppComponent implements OnInit {
  title = 'AlcoRev';  
  headerimg: any;
  username: any;
  user: any;
  loginForm;
  @ViewChild('loginforms') loginforms: ElementRef;
  @ViewChild('logoutbtn') logoutbtn: ElementRef;
  loggedin;
  constructor(private BeverageService: BackendService, private addform: AddformComponent){    
  }

  login(value){
    this.BeverageService.loginUser(value).subscribe(response =>{
      this.username = response['username'];
      this.user = response;
      
      document.getElementById('loginforms').style.display = 'none';
      document.getElementById('logoutbtn').style.display = 'block';
    });
  }

  logout(){
    this.BeverageService.logout();
  }

  ngOnInit(){
    document.getElementById('logoutbtn').style.display = 'none';
    this.BeverageService.getNasaAPI().subscribe(response =>{
      this.headerimg = response.hdurl;
      if(response.hdurl === undefined && response.media_type != 'video'){this.headerimg = response.url;}//this part makes sure that an imgae exist even if the api returns a video
      else if(response.media_type === 'video'){this.headerimg = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fd3ao8sz5crj5i0.cloudfront.net%2F005_hubble-crab-nebula.jpg&f=1&nofb=1';}
    });
    this.BeverageService.loggedIn.subscribe(response => { this.loggedin = response})
    this.loginForm = new FormGroup({
      uname:  new FormControl,
      pword: new FormControl
    }); 
  } 

}
