import { Component, OnInit } from '@angular/core';
import { BeverageService } from '../app/services/beverage.service';
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
  
  loginForm;

  constructor(private BeverageService: BeverageService){}

  login(value){
    this.BeverageService.tempmethod(value).subscribe(response =>{
      
    });
  }

  ngOnInit(){
    this.BeverageService.getNasaAPI().subscribe(response =>{
      this.headerimg = response.hdurl;
      if(response.hdurl === undefined && response.media_type != 'video'){this.headerimg = response.url;}//this part makes sure that an imgae exist even if the api returns a video
      else if(response.media_type === 'video'){this.headerimg = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fd3ao8sz5crj5i0.cloudfront.net%2F005_hubble-crab-nebula.jpg&f=1&nofb=1';}
    });

    this.loginForm = new FormGroup({
      uname:  new FormControl,
      pword: new FormControl
    }); 
  } 

}
