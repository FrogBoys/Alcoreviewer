import { Injectable, OnChanges, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Beverage } from '../models/Beverage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeverageService implements OnInit{
  dataset: any[];

  constructor(private http: HttpClient) { 
    console.log('initalized');  
    
  }

  getData(): Observable <Beverage[]>{      
    return this.http.get<Beverage[]>('/api/beverages');
  }
  //APK call
  getAPK(): Observable <any[]>{
    return this.http.get<any[]>('https://alkoholperkrona.nu/data.json');
  }
  addData(data){
    var header = new Headers();
    header.append('Content-Type', 'application/json');    
    return this.http.post('./api/beverages/add',data);
  }

  deleteData(id){
    return this.http.delete('./api/beverages/'+ id);    
  }

  changeData(data){
    return this.http.put('./api/beverages' + data._id, data);
  }

  getsingularData(id){
    return this.http.get('./api/apkbeverages/' + id);
  }

  getNasaAPI(): any{
    return this.http.get('https://api.nasa.gov/planetary/apod?api_key=Dqnf5WxdbtyF9i6TwvBsj0XeWtJNhAwdsPsqXR57');
  }

  tempmethod(data){
    return this.http.get('./login/login', data)
  }

  ngOnInit(): void{
    this.getData();
  }

}
