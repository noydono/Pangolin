import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileGuard } from './guards/profile.guard';
import { FriendComponent } from './components/friend/friend.component';



const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent,canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent,canActivate:[ProfileGuard]},
  {path:"friend", component:FriendComponent,canActivate:[ProfileGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
