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
  errors: any;
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
    this.form.isActive = true
    return this.authService.register(this.form)
      .subscribe(
        res => {
          let snackBarRef = this.snackBar.open('Inscription réussi vous pouvez vous connecter','Undo',{
            duration: 3000
          });
          this.router.navigate(["/login"])
        },
        err => {
          this.isFailed = true         
          for(let i = 0; i < err.error.errors.length;i++){
            this.errors = Object.assign(this.errors,err.error.errors[i])
          }    
         
        }
      )
  }

}

