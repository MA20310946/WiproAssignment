import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(private httpclient :HttpClient) { }
  getbankslist(par1:string){
    return this.httpclient.get('https://vast-shore-74260.herokuapp.com/banks?city='+ par1);
  }
}
