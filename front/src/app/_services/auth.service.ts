import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:8080/api/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http : HttpClient) { }

  register(user): Observable<any>{
    return this.http.post( BaseUrl + "register", user)
  }

  login(credential): Observable<any>{    
    return this.http.post( BaseUrl + "login", credential )
  }
  update(data,id): Observable<any>{
    console.log(data);
    console.log(id);
    
    return this.http.put( BaseUrl + "update/" + id, data )
  }
}
