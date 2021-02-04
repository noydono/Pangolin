import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
    selector: 'app-invite-friend',
    templateUrl: './invite-friend.component.html',
    styleUrls: ['./invite-friend.component.sass']
})
export class InviteFriendComponent implements OnInit {

    form: any = {};
    registerIsFailed: Boolean = false;
    errors: any;
    myProfile: any = [];


    constructor(
        private authService: AuthService,
        private friendService: FriendsService,
        private TokenStorageService: TokenStorageService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getMyProfile()
    }

    getMyProfile(): void {
        this.myProfile = this.TokenStorageService.getProfile()
    }

    register() {

        return this.authService.register(this.form)
            .subscribe(
                res => {
                    this.friendService.addFriend(this.myProfile._id, res).subscribe(
                        res => {

                            let snackBarRef = this.snackBar.open('Inscription réussi il a été rajouter à vos amis', 'Cacher', {
                                duration: 3000
                            })
                            this.router.navigate(["/profile"])

                        }, err => {

                            this.registerIsFailed = true
                            for (let i = 0; i < err.error.errors.length; i++) {
                                this.errors = Object.assign(this.errors, err.error.errors[i])
                            }

                        })
                },
                err => {

                    this.registerIsFailed = true
                    for (let i = 0; i < err.error.errors.length; i++) {
                        this.errors = Object.assign(this.errors, err.error.errors[i])
                    }
                }
            )
    }

}
