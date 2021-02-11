import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendsService } from 'src/app/_services/friends.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
    selector: 'app-invite-friend',
    templateUrl: './invite-friend.component.html',
    styleUrls: ['./invite-friend.component.sass']
})
export class InviteFriendComponent implements OnInit, OnDestroy {

    constructor(
        private authService: AuthService,
        private friendService: FriendsService,
        private TokenStorageService: TokenStorageService,
        private router: Router,
        private snackBar: MatSnackBar,
        private fromBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.getMyProfile()
        this.initformulaire()
    }

    ngOnDestroy() {
        if (this.registerSubscription) { this.registerSubscription.unsubscribe() }
    }

    onSubmit() {
        this.registerSubscription = this.authService.register(this.formulaire.value)
            .subscribe(
                (response) => {
                    this.addFriendSubscription = this.friendService.addFriend(this.myProfile._id, response).subscribe(
                        () => {
                            this.snackBar.open('Inscription réussi il a été rajouter à vos amis', 'Cacher', {
                                duration: 3000
                            })
                            this.router.navigate(["/profile"])
                        })
                },
                (error) => {

                    for (let i = 0; i < error.error.errors.length; i++) {
                        let responseErr = error.error.errors;
                        this.errors = Object.assign(this.errors, responseErr[i])
                        this.formulaire.controls[`${Object.keys(responseErr[i])}`].setErrors({ 'incorrect': true })
                    }

                }
            )
       
    }

    getMyProfile(): void {
        this.myProfile = this.TokenStorageService.getProfile()
    }

    initformulaire() {
        this.formulaire = this.fromBuilder.group(
            {
                username: ["", [Validators.required]],
                email: ["", [Validators.required, Validators.email]]
            }
        )
    }

    // Formulaire
    formulaire: FormGroup;
    
    //Rxjs
    registerSubscription: Subscription
    addFriendSubscription: Subscription

    // ERRORS 
    errors: any = {};

    // BESOIN Externe
    myProfile: any = [];

}
