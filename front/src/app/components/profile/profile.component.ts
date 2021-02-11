import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {


  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private friendService: FriendsService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.getMyProfile()
    this.initFormulaire()
    this.getMyFriends()
  }

  ngOnDestroy(): void  {
    if (this.getMyFriendsSubcription) { this.getMyFriendsSubcription.unsubscribe() }
    if (this.onSubmitSubcription) { this.onSubmitSubcription.unsubscribe() }
    if (this.goodByMyFriendSubcription) { this.goodByMyFriendSubcription.unsubscribe() }
  }

  initFormulaire(): void  {
    this.formulaire = this.formBuilder.group(
      {
        age: [this.myProfile.age, [Validators.required]],
        food: [this.myProfile.food, [Validators.required]],
        race: [this.myProfile.race, [Validators.required]],
        famille: [this.myProfile.famille, [Validators.required]],
      }
    )
  }

  getMyProfile(): void {
    this.myProfile = this.tokenStorageService.getProfile()
  }

  getMyFriends(): void {

    this.getMyFriendsSubcription = this.friendService.getMyFriend(this.myProfile._id).subscribe(
      res => {
        this.myFriends = res.friends.flat(1)
      }
    )
  }

  onSubmit(): void {
    this.onSubmitSubcription = this.authService.update(this.formulaire.value, this.myProfile._id).subscribe(
      res => {
        this.tokenStorageService.signOut()
        window.location.reload()
      },
      (error) => {
        let responseErr: object = error.error.errors;
        for (let i = 0; i < error.error.errors.length; i++) {
          this.errors = Object.assign(this.errors, responseErr[i])
          this.formulaire.controls[`${Object.keys(responseErr[i])}`].setErrors({ 'incorrect': true })
        }
      }
    )
  }

  goodByMyFriend(profile_id, friend): void {
    this.goodByMyFriendSubcription = this.friendService.removeMyFriend(profile_id, { friend }).subscribe(
      res => {
        window.location.reload()
      }
    )
  }

  

  // Formulaire
  formulaire: FormGroup;
  onSubmitSubcription: Subscription;
  getMyFriendsSubcription: Subscription;
  goodByMyFriendSubcription: Subscription;

  //Besoin Externe
  myProfile: any = {};
  myFriends: any = [];

  // ERRORS 
  getIsFailed: Boolean = false;
  deleteIsFailed: Boolean = false;
  updateIsFailed: Boolean = false;
  errors: any = {};

  // STYLE Form
  colorInputPosition: string = 'top'
  colorPickerFormat: string = 'hex'
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

}
