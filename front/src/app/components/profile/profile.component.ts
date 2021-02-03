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
  colorInputPosition = 'top'
  form: any = {};
  myProfile: any={};
  myFriends: any=[];
  errorUsername: String;
  errorEmail: String;
  errorPassword: String;
  errorRace: String;
  errorFood: String;
  errorAge: String;
  errorFamille: String;
  foods: any = [
    {value: 'termites', viewValue: 'Termites'},
    {value: 'fourmi', viewValue: 'Fourmis'},
  ];
  races: any = [
    {value: 'indien', viewValue: 'Indien'},
    {value: 'malais', viewValue: 'Malais'},
    {value: 'chine', viewValue: 'Chine'},
    {value: 'philippines', viewValue: 'Philippines'},
    {value: 'geant', viewValue: 'Géant'},
    {value: 'cap', viewValue: 'Cap'},
    {value: 'longuequeue', viewValue: 'Longue queue'},
    {value: 'petitesecailles', viewValue: 'Petites écailles'},
  ];
  
  

  constructor(
    private tokenStorageService : TokenStorageService,
    private authService : AuthService,
    private friendService : FriendsService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getMyFriends()
  }

 
  
  update(): void{
    this.authService.update(this.form,this.myProfile._id).subscribe(
      res => {
        this.tokenStorageService.signOut()
        this.reloadPage()
      },
      err => {        
        console.log(err);
        
          let findRaceErr = err.error.errors.find(e => e.race)
          let findFoodErr = err.error.errors.find(e => e.food)
          let findFamilleErr = err.error.errors.find(e => e.famille)
          let findAgeErr = err.error.errors.find(e => e.age)
          if (findRaceErr) {
            this.errorRace = findRaceErr.race
          }
          if (findFoodErr) {
            this.errorFood = findFoodErr.food
          }
          if (findFamilleErr) {
            this.errorFamille = findFamilleErr.famille
          }
          if (findAgeErr) {
            this.errorAge = findAgeErr.age
          }
      }
    )
  }

  getProfile(): void{
    this.myProfile = this.tokenStorageService.getProfile()
    this.form.famille = this.myProfile.famille
  }

  getMyFriends(): void {
    this.friendService.getMyFriend(this.myProfile._id).subscribe(
      res => {
        this.myFriends = res.friends.flat(2)
        
      }, err => {
        console.log(err);

      }
    )
  }
  goodByMyFriend(profile_id,friend): void{
    
    this.friendService.removeFriend(profile_id,{friend}).subscribe(
      res=>{
        console.log(res);
        this.reloadPage()
      },err=>{
        console.log(err);
        
      }
    )
  }
  

  reloadPage(): void {
    window.location.reload()
  }
}
