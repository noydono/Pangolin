import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import {FormControl,Validators,FormBuilder,FormGroup, AbstractControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  
  colorPickerFormat = 'hex'
  isFailed : boolean= false;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  form: FormGroup;
  errors: any = {}
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
     private snackBar : MatSnackBar,
     private formBuilder : FormBuilder
     ){ }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:[,[this.ValidateField]],
      email:[,[this.ValidateField]],
      password:[,[this.ValidateField]],
      age:[,[this.ValidateField]],
      race:[,[this.ValidateField]],
      food:[,[this.ValidateField]],
      famille:[,[this.ValidateField]]
    })
    
  }

  ValidateField(control: AbstractControl): {[key: string]: any} | null  {
      return { 'fieldInvalid': true };
  }
  get f(){
      console.log("get"); 
      console.log(this.form.controls["famille"]);
      return this.form.controls
  }
  get coloFormat(): String{
    return "hex"
  }
  register() {
    return this.authService.register(this.form.value)
      .subscribe(
        res => {
          this.snackBar.open('Inscription réussi vous pouvez vous connecter','Undo',{
            duration: 3000
          });
          this.router.navigate(["/login"])
        },
        err => { 
          this.isFailed = true         
          for(let i = 0; i < err.error.errors.length;i++){
            this.errors = Object.assign(this.errors,err.error.errors[i])
          }    
          console.log(this.errors);
        }
      )
  }
  
  redirectConnection() {
    this.router.navigate['/login']
  }

}

