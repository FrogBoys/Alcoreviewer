import { Component, OnInit } from '@angular/core';
import { BackendService } from './services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'AlcoRev';  
  headerimg: any;
  username: any;
  user: any;
  loginForm: FormGroup;
  loginforms:boolean;
  logoutbtn:boolean;
  loggedIn: boolean;
  headertxt;

  constructor(private bevService: BackendService){
    this.loginForm = new FormGroup({
    uname:  new FormControl(),
    pword: new FormControl()
    }); 
    //this.getlogin();
  }

  login(value){
    this.bevService.loginUser(value).subscribe(response =>{
      this.username = response['username'];
      this.user = response;
      this.loginforms = false;
      this.logoutbtn = true;      
      this.loggedIn = true;
    });
  }

  logout(){
    this.bevService.logout();
  }

  getlogin(){
    this.bevService.loggedIn.subscribe(response => { 
      this.loggedIn = response;
      this.loginforms = !response;
      this.logoutbtn = response;      
      if(response == true){
        this.bevService.user.subscribe(resp =>{this.user = resp; this.username = resp['username'];});
      }
    });  
  }

  ngOnInit(){
    this.logoutbtn = false;      
    this.bevService.getNasaAPI().subscribe(response =>{
      this.headerimg = response.hdurl;
      this.headertxt =  'Picture brought to you by curtesy of NASA'
      if(response.hdurl === undefined && response.media_type != 'video'){this.headerimg = response.url;}//this part makes sure that an imgae exist even if the api returns a video
      else if(response.media_type === 'video'){
        this.headerimg = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fd3ao8sz5crj5i0.cloudfront.net%2F005_hubble-crab-nebula.jpg&f=1&nofb=1';
        this.headertxt = 'Due NASA providing a video this is the picture you get' //fun way to tell the user that the NASA api dint' return a picture
      }
    });   
    //this.getlogin();
  } 

}
