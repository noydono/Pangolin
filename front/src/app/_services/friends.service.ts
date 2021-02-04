import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:8080/api/friend';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {

    constructor(
        private http: HttpClient,
    ) { }

    getPangolin(): Observable<any> {
        return this.http.get(BaseUrl)
    }

    inviteFriend(user): Observable<any> {
        return this.http.post(BaseUrl, user)
    }

    addFriend(userId, friend): Observable<any> {
        console.log(userId, friend);
        return this.http.post(BaseUrl + "/" + userId, friend)
    }

    removeMyFriend(userId, friend): Observable<any> {
        return this.http.put(BaseUrl + "/" + userId,
            {
                _id: friend.friend._id,
                username: friend.friend.username
            }
        )
    }
    getMyFriend(userId): Observable<any> {
        return this.http.get(BaseUrl + "/" + userId)
    }
}
