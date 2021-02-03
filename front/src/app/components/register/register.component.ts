import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  form: any = {};
  isFailed: Boolean = false;
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
    private authService: AuthService,
     private router: Router,
     private snackBar : MatSnackBar
     ){ }

  ngOnInit(): void {
  }

  register() {
    return this.authService.register(this.form)
      .subscribe(
        res => {
          let snackBarRef = this.snackBar.open('Inscription réussi vous pouvez vous connecter','Undo',{
            duration: 3000
          });
          this.router.navigate(["/login"])
        },
        err => {
          console.log(err);

          let findUsernameErr = err.error.errors.find(e => e.username)
          let findPasswordErr = err.error.errors.find(e => e.password)
          let findRaceErr = err.error.errors.find(e => e.race)
          let findEmailErr = err.error.errors.find(e => e.email)
          let findFoodErr = err.error.errors.find(e => e.food)
          let findFamilleErr = err.error.errors.find(e => e.famille)
          let findAgeErr = err.error.errors.find(e => e.age)

          if (findUsernameErr) {
            this.errorUsername = findUsernameErr.username
          }
          if (findEmailErr) {
            this.errorEmail = findEmailErr.email
          }
          if (findPasswordErr) {
            this.errorPassword = findPasswordErr.password

          }
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
  
  redirectConnection() {
    this.router.navigate['/login']
  }

}

