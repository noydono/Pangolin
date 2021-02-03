import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isFailed: Boolean = false;
  errorEmail: String;
  errorPassword: String;

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private route: Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.login(this.form).subscribe(
      res => {
        this.token.saveToken(res.token);
        this.token.saveUser(res.pangolin);
        this.reloadPage()
        this.route.navigate(['/home'])
      },
      error => {
        console.log(error);
        
        for (let i = 0; i < error.error.errors.length; i++) {
          this.errorPassword = error.error.errors[i].password
          this.errorEmail = error.error.errors[i].email
        }

        this.isFailed = true
      }
    )
  }
  reloadPage(): void {
    window.location.reload()
  }

}
