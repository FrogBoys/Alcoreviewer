import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;//initilizing formgroup
  constructor(private bend: BackendService,) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({//initilizing formgroup
      username: new FormControl,
      password: new FormControl,
      valpassword: new FormControl
    });
  }
//method to signup users
  SignUpUser(data){//data taken from formgroup
    console.log(data);
    if(data.password === data.valpassword){//making sure that the two passwords are the same
      this.bend.signUpUser(data).subscribe(response => {});//service call to signup user
    }
  }

}
