import { Component, OnInit } from '@angular/core';
import { BackendService } from './services/backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackendService]
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
  secondroutertxt;

  constructor(private bevService: BackendService){
    this.loginForm = new FormGroup({
      uname:  new FormControl(),
      pword: new FormControl()
    }); 
    this.getlogin();
  }

  login(value){//log in method that sets various visual and fucntion properties such as what says what and of the login and signup inputs is hidden/shown
    this.bevService.loginUser(value).subscribe(response =>{
      this.username = response['username'];
      this.user = response; //sets user from response
      this.loginforms = false;
      this.logoutbtn = true;      
      this.loggedIn = true;
      this.bevService.loggedIn.next(true);
      if(response['usertype'] == 'admin'){//sets what is shown to the two different users
        this.secondroutertxt = 'Administrera';
      }
      else{
        this.secondroutertxt = 'Mina drycker'
      }
    });
  }

  logout(){//logout function which hides and removes appropriate elements
    this.bevService.logout();
    this.bevService.loggedIn.subscribe(response => { 
      this.loggedIn = response;
      this.loginforms = !response;
      this.logoutbtn = response;      
      if(response == true){
        this.bevService.user.subscribe(resp =>{this.user = resp; this.username = resp['username'];});
      }
      else{this.username = undefined;}
    });    
  }

  getlogin(){
    this.bevService.loggedIn.subscribe(response => { 
      this.loggedIn = response;
      this.loginforms = !response;
      this.logoutbtn = response;      
      if(response == true){
        this.bevService.user.subscribe(resp =>{
          this.user = resp; 
          this.username = resp['username'];
          if(resp['usertype'] == 'admin'){
            this.secondroutertxt = 'Administrera';
          }
          else{
            this.secondroutertxt = 'Mina drycker'
          }          
        });
      }
      else{
        this.username = undefined;
      }
    });  
  }

  ngOnInit(){
    this.bevService.getNasaAPI().subscribe(response =>{
      this.headerimg = response.hdurl;
      this.headertxt =  'Picture brought to you by curtesy of NASA'
      if(response.hdurl === undefined && response.media_type != 'video'){this.headerimg = response.url;}//this part makes sure that an imgae exist even if the api returns a video
      else if(response.media_type === 'video'){
        this.headerimg = '../src/assets/img/hubblepicture.jpg'; //incase of video or other a standar replacement image is shown
        this.headertxt = 'Due NASA providing a video this is the picture you get' //fun way to tell the user that the NASA api dint' return a picture
      }
    });
    //this.getlogin();
  } 

}
