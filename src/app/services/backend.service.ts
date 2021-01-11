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
  loggedIn: Subject<boolean>
  user: Subject<User>;
  constructor(private http: HttpClient) { 
    this.loggedIn = new Subject();
    this.user = new Subject();
    this.getData();
    this.checkUser();
  }

  getData(): Observable <Beverage[]>{return this.http.get<Beverage[]>('/api/beverages');}
  //APK call
  getAPK(): Observable <any[]>{return this.http.get<any[]>('https://alkoholperkrona.nu/data.json');
  }
  addData(data){
    var header = new Headers();
    header.append('Content-Type', 'application/json');    
    return this.http.post('./api/beverages/add',data);
  }

  deleteData(id){return this.http.delete('./api/beverages/'+ id);}

  changeData(data, beverageid){return this.http.put('./api/beverage/' + beverageid, data);}

  getsingularData(id){return this.http.get('./api/apkbeverages/' + id);}

  getNasaAPI(): any{return this.http.get('https://api.nasa.gov/planetary/apod?api_key=Dqnf5WxdbtyF9i6TwvBsj0XeWtJNhAwdsPsqXR57'); }

  getmyData(id): Observable <Beverage[]>{
    return this.http.get<Beverage[]>('/api/my-beverages/' + id);
  }
  

  loginUser(data){
    return this.http.post('./login/login', data, {withCredentials: true});
  }

  checkUser(){     
    this.http.get('./login/login', {withCredentials: true}).subscribe((response: any) =>{
      this.loggedIn.next(response['loggedIn']); 
      this.user.next(response['user']);
    });
  }
  logout(){
    return this.http.get('./login/logout');
  }

  signUpUser(data){
    return this.http.post('./login/signup', data)
  }
  
  ngOnInit(): void{

  }
}
