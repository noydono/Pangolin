import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:8080/api/friend';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {

    constructor(
        private http: HttpClient,
    ) { }

    getPangolin(){
        return this.http.get<any>(BaseUrl)
    }

    inviteFriend(user){
        return this.http.post<any>(BaseUrl, user)
    }

    addFriend(userId, friend){
        return this.http.post<any>(BaseUrl + "/" + userId, friend)
    }

    removeMyFriend(userId, friend){
        return this.http.put<any>(BaseUrl + "/" + userId,
            {
                _id: friend.friend._id,
                username: friend.friend.username
            }
        )
    }
    getMyFriend(userId){
        return this.http.get<any>(BaseUrl + "/" + userId)
    }
}
