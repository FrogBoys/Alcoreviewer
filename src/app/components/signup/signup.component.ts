import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  constructor(private bend: BackendService,) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl,
      password: new FormControl,
      valpassword: new FormControl
    });
  }

  SignUpUser(data){
    console.log(data);
    if(data.password === data.valpassword){
      this.bend.signUpUser(data).subscribe(response => {});
    }
  }

}
