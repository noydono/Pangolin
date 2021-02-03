import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../../_services/token-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isLoggedIn = false;
  username: string;
  colorFamille;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorageService : TokenStorageService
    ) {}
      ngOnInit():void{
        this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    
        if(this.isLoggedIn){
          const user = this.tokenStorageService.getProfile();
          this.username = user.username;
          this.colorFamille = `background-color:${user.famille} !important;`
        }
      }

      logout(): void{
        this.tokenStorageService.signOut();
        window.location.reload();
      }
}
