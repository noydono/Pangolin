import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.sass']
})
export class FriendComponent implements OnInit, OnDestroy {
  
  constructor(
    private friendService: FriendsService,
    private TokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void{
    this.getProfile()
    this.getMyFriend()
    this.getPangolin()
  }

  ngOnDestroy(): void{
    if(this.getPangolinSubscription){this.getPangolinSubscription.unsubscribe()}
    if(this.addFriendSubscription){this.addFriendSubscription.unsubscribe()}
    if(this.getMyFriendSubscription){this.getMyFriendSubscription.unsubscribe()}
  }

  getPangolin(): void{
    this.getPangolinSubscription = this.friendService.getPangolin()
    .subscribe(
      (response) => {
        // Refacto possible je pense, voir avec pipe map et filter 
        // si il n'y a pas moyen de filtré directement l'observable
        this.pangolins = response
        for (let i = 0; i < this.myFriends.length; i++) {         
          for (let e = 0; e < this.pangolins.length; e++) {
            if (this.pangolins[e]._id === this.myFriends[i]._id) {
              this.pangolins.splice(e, 1)
            }
          }
        }
      }
    )
  }
  
  addFriend(friend): void{
    this.addFriendSubscription = this.friendService.addFriend(this.myProfile._id, friend).subscribe(
      (response) => {
        window.location.reload()
      }
    )
  }

  getProfile(): void{
    this.myProfile = this.TokenStorageService.getProfile()
  }

  getMyFriend(): void{
   this.getMyFriendSubscription = this.friendService.getMyFriend(this.myProfile._id).subscribe(
    (response) => {
        if(response != null){
          this.myFriends = response.friends.flat(1)
        }
      }
    )
  }


  //rxjs
  getPangolinSubscription: Subscription;
  addFriendSubscription: Subscription;
  getMyFriendSubscription: Subscription;

  //BESOIN externe
  pangolins: any = [];
  myProfile: any = [];
  myFriends: any = [];

}
