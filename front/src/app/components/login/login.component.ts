import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormulaire()
  }

  ngOnDestroy() {
    if (this.loginSubscription) { this.loginSubscription.unsubscribe() }
  }

  onSubmit() {
    this.loginSubscription = this.authService.login(this.formulaire.value)
    .subscribe(
      (response) => {
        this.tokenStorageService.saveToken(response.token);
        this.tokenStorageService.saveUser(response.pangolin);
        window.location.reload()
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
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
      }
    )
  }

  // Formulaire
  formulaire: FormGroup;

  //Rxjs
  loginSubscription: Subscription;

  // ERRORS 
  errors: any = {};

}
