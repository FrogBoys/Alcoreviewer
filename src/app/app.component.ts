import { Component, OnInit } from '@angular/core';
import { BackendService } from './services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(private Service: BackendService){
    this.loginForm = new FormGroup({
      uname:  new FormControl(),
      pword: new FormControl()
    }); 
    this.getlogin();
  }

  login(value){//log in method that sets various visual and fucntion properties such as what says what and of the login and signup inputs is hidden/shown
    this.Service.loginUser(value).subscribe(response =>{
      this.username = response['username'];
      this.user = response; //sets user from response
      this.loginforms = false;
      this.logoutbtn = true;      
      this.loggedIn = true;
      this.Service.loggedIn.next(true);//sets what the loggedIn should be
      if(response['usertype'] == 'admin'){//sets what is shown to the two different users
        this.secondroutertxt = 'Administrate';
      }
      else{
        this.secondroutertxt = 'My beverages'
      }
    });
  }

  logout(){//logout function which hides and removes appropriate elements
    this.Service.logout();//call to service to logout user
    this.Service.loggedIn.subscribe(response => {//subscribtion to get the state of the user then setting if loginforms/logout button is shown or hidden
      this.loggedIn = response;
      this.loginforms = !response;
      this.logoutbtn = response;      
      if(response == true){
        this.Service.user.subscribe(resp =>{this.user = resp; this.username = resp['username'];});
      }
      else{this.username = undefined;}
    });    
  }

  getlogin(){//method to get the state of the user and the user itself
    this.Service.loggedIn.subscribe(response => {//subscription to loggedIn property
      this.loggedIn = response;
      this.loginforms = !response;
      this.logoutbtn = response;      
      if(response == true){
        this.Service.user.subscribe(resp =>{//subscription to user porperty
          this.user = resp; //user is set from response
          this.username = resp['username'];
          if(resp['usertype'] == 'admin'){//sets what is shown to the two different users
            this.secondroutertxt = 'Administrate';
          }
          else{
            this.secondroutertxt = 'My beverages'
          }          
        });
      }
      else{
        this.username = undefined;//if response is not true username is undefind just to error handle
      }
    });  
  }

  ngOnInit(){
    this.Service.getNasaAPI().subscribe(response =>{//subscription to nasa api of the day which sets the header img this was implemented incse the APK API was insufficent
      this.headerimg = response.hdurl;
      this.headertxt =  'Picture brought to you by curtesy of NASA'
      if(response.hdurl === undefined && response.media_type != 'video'){this.headerimg = response.url;}//this part makes sure that an imgae exist even if the api returns a video
      else if(response.media_type === 'video'){
        this.headerimg = '../src/assets/img/hubblepicture.jpg'; //incase of video or other a standar replacement image is shown
        this.headertxt = 'Due NASA providing a video this is the picture you get' //fun way to tell the user that the NASA api dint' return a picture
      }
    });
  } 

}
