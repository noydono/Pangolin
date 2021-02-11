import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

const BaseUrl = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  register(user){
    return this.http.post<any>(BaseUrl + "register", user)
  }

  login(credential){
    return this.http.post<any>(BaseUrl + "login", credential)
  }

  update(data, id){
    return this.http.put<any>(BaseUrl + "update/" + id, data)
  }

}
