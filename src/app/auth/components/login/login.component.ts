import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseConfigService } from '../../../../../@fuse/services/config.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'login-2',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    showError: boolean;

    loginForm: FormGroup;
    returnUrl: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // Configure the layout
        this._fuseConfigService.config = {
            // layout: {
            //     navbar: {
            //         hidden: true
            //     },
            //     toolbar: {
            //         hidden: true
            //     },
            //     footer: {
            //         hidden: true
            //     },
            //     sidepanel: {
            //         hidden: true
            //     }
            // }
            colorTheme: 'theme-dark-blue',
            customScrollbars: true,
            layout: {
                style: 'vertical-layout-1',
                width: 'fullwidth',
                navbar: {
                    primaryBackground: 'inherit',
                    secondaryBackground: 'inherit',
                    folded: true,
                    hidden: true,
                    position: 'left',
                    variant: 'vertical-style-2'
                },
                toolbar: {
                    customBackgroundColor: false,
                    background: 'inherit',
                    hidden: true,
                    position: 'below-static'
                },
                footer: {
                    customBackgroundColor: true,
                    background: 'inherit',
                    hidden: true,
                    position: 'below-fixed'
                },
                sidepanel: {
                    hidden: true,
                    position: 'right'
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit(): void {
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((success) => {
            // console.log('login', success);
            if (success) {
                this.showError = false;
                this.router.navigate(['/portal']);
            } else {
                this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                }, 5000);
            }
        });
    }
}
