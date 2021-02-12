import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  register(user: object): Observable<any>{
    return this.http.post<any>(BaseUrl + "register", user)
  }

  login(credential : object): Observable<any>{
    return this.http.post<any>(BaseUrl + "login", credential)
  }

  update(data: object, id: string): Observable<any>{
    return this.http.put<any>(BaseUrl + "update/" + id, data)
  }

  delete(id: string): Observable<any>{
    return this.http.delete<string>(BaseUrl + "delete/" + id)
  }

}
