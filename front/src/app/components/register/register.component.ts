import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormulaire()
  }

  ngOnDestroy() {
    if (this.registerSubscription) { this.registerSubscription.unsubscribe() }
  }

  onSubmit() {
    this.registerSubscription = this.authService.register(this.formulaire.value)
      .subscribe(
        (response) => {
           this.snackBar.open('Inscription réussi vous pouvez vous connecter', 'Undo', {
            duration: 3000
          });
          this.router.navigate(["/login"])
        },
        (error) => {
          let responseErr = error.error.errors;
          for (let i = 0; i < error.error.errors.length; i++) {
            this.errors = Object.assign(this.errors,responseErr[i] )
            this.formulaire.controls[`${Object.keys(responseErr[i])}`].setErrors({ 'incorrect': true })
          }
        }
      )
  }

  initFormulaire() {
    this.formulaire = this.formBuilder.group(
      {
        username: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
        age: [, [Validators.required]],
        food: ["", [Validators.required]],
        race: ["", [Validators.required]],
        famille: ["", [Validators.required]],
      }
    )
  }

  // Formulaire
  formulaire: FormGroup;
  
  //Rxjs
  registerSubscription: Subscription;

  // ERRORS
  errors: any = {};

  // STYLE Form
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
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

