import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

// Formulaire
  form: any = {};

//Besoin Externe
  myProfile: any = {};
  myFriends: any = [];

// ERRORS 
  getIsFailed: Boolean= false;
  deleteIsFailed: Boolean= false;
  updateIsFailed: Boolean= false;
  errors: any;

// STYLE Form
  colorInputPosition = 'top'
  foods: any = [
    { value: 'termites', viewValue: 'Termites' },
    { value: 'fourmi', viewValue: 'Fourmis' },
  ];
  races: any = [
    { value: 'indien', viewValue: 'Indien' },
    { value: 'malais', viewValue: 'Malais' },
    { value: 'chine', viewValue: 'Chine' },
    { value: 'philippines', viewValue: 'Philippines' },
    { value: 'geant', viewValue: 'Géant' },
    { value: 'cap', viewValue: 'Cap' },
    { value: 'longuequeue', viewValue: 'Longue queue' },
    { value: 'petitesecailles', viewValue: 'Petites écailles' },
  ];



  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private friendService: FriendsService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getMyProfile()
    this.getMyFriends()
  }



getMyProfile(): void {
  this.myProfile = this.tokenStorageService.getProfile()
  this.form.famille = this.myProfile.famille
}

getMyFriends(): void {

  this.friendService.getMyFriend(this.myProfile._id).subscribe(
    res => {
      if (res != null) {
        this.myFriends = res.friends.flat(1)
      }
    }, err => {

      this.getIsFailed = true
      for (let i = 0; i < err.error.errors.length; i++) {
        this.errors = Object.assign(this.errors, err.error.errors[i])
      }

    }
  )

}
  update(): void {
    this.authService.update(this.form, this.myProfile._id).subscribe(
      res => {
        this.tokenStorageService.signOut()
        this.reloadPage()
      },
      err => {
        this.updateIsFailed = true
        for (let i = 0; i < err.error.errors.length; i++) {
          this.errors = Object.assign(this.errors, err.error.errors[i])
        }
      }
    )
  }

  goodByMyFriend(profile_id, friend): void {

    this.friendService.removeMyFriend(profile_id, { friend }).subscribe(
      res => {
        this.reloadPage()
      }, err => {

        this.deleteIsFailed = true
        for (let i = 0; i < err.error.errors.length; i++) {
          this.errors = Object.assign(this.errors, err.error.errors[i])
        }

      }
    )
  }

  //
  reloadPage(): void {
    window.location.reload()
  }

  
}
