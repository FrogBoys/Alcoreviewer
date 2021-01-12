import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beverage } from '../models/Beverage';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})

export class BackendService implements OnInit{
  dataset: any[];
  loggedIn: Subject<boolean>;//created a subject<boolean> to get a subcribable bool
  user: Subject<User>;//created a subject<User> to get a subcribable user

  constructor(private http: HttpClient) { 
    this.loggedIn = new Subject();
    this.user = new Subject();
    this.getData();
    this.checkUser();
  }
  //gets all beverages in the db
  getData(): Observable <Beverage[]>{return this.http.get<Beverage[]>('/api/beverages');}
  //APK call this might be less than needed so NASA API was added as a header image
  getAPK(): Observable <any[]>{return this.http.get<any[]>('https://alkoholperkrona.nu/data.json');
  }
  //add data call s
  addData(data){
    this.http.post('./api/beverages/add',data).subscribe(async (response) => {return await response});
  }

  deleteData(id){return this.http.delete('./api/beverages/'+ id);}

  changeData(data, beverageid){return this.http.put('./api/beverage/' + beverageid, data);}

  getsingularData(id){return this.http.get('./api/apkbeverages/' + id);}

  //NASA API to get image/video of the day 
  getNasaAPI(): any{return this.http.get('https://api.nasa.gov/planetary/apod?api_key=Dqnf5WxdbtyF9i6TwvBsj0XeWtJNhAwdsPsqXR57'); }
  //get the specified users data with thier userid
  getmyData(id): Observable <Beverage[]>{
    return this.http.get<Beverage[]>('/api/my-beverages/' + id);
  }
  //login call
  loginUser(data){
    return this.http.post('./login/login', data, {withCredentials: true});
  }
  //check is the user is still active call
  checkUser(){     
    this.http.get('./login/login', {withCredentials: true}).subscribe((response: any) =>{
      this.loggedIn.next(response['loggedIn']); 
      this.user.next(response['user']);
    });
  }
  //logout call
  logout(){
    this.http.post('./login/logout', {}, {withCredentials: true}).subscribe(response =>{this.loggedIn.next(false);});
  }
  //sign up user to the web service call 
  signUpUser(data){
    return this.http.post('./login/signup', data)
  }
  
  ngOnInit(): void{

  }
}
