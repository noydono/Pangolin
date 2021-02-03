import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.sass']
})
export class FriendComponent implements OnInit {
  pangolins: any = [];
  myProfile: any = [];
  myFriends: any = [];
  friendAdded: String;
  constructor(
    private friendService: FriendsService,
    private TokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getMyFriend()
    this.getPangolin()
  }
  ngAfterContentInit(): void {

  }
  getPangolin() {
    this.friendService.getPangolin().subscribe(
      res => {

        this.pangolins = res
        
        for (let i = 0; i < this.myFriends.length; i++) {         
          for (let e = 0; e < this.pangolins.length; e++) {
            if (this.pangolins[e]._id === this.myFriends[i]._id) {
              this.pangolins.splice(e, 1)
            }
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }
  background(color) {
    return "background-color:" + color + ";"
  }

  addFriend(friend) {
    let user = this.TokenStorageService.getProfile()
    this.friendService.addFriend(user._id, friend).subscribe(
      res => {
        this.reloadPage();
      },
      err => {
        console.log(err)
      }
    )
  }

  getProfile(): void {
    this.myProfile = this.TokenStorageService.getProfile()
  }

  getMyFriend(): void {
    this.friendService.getMyFriend(this.myProfile._id).subscribe(
      res => {
        this.myFriends = res.friends.flat(1)
      }, err => {
        console.log(err);

      }
    )
  }

  reloadPage(): void {
    window.location.reload()
  }

}
