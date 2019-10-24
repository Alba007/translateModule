import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

// import {FuseConfigService} from '@fuse/services/config.service';
// import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import { navigation } from '../../../fuse-config/navigation';
import { MatDialog, MatDialogRef } from "@angular/material";
import { NotificationsComponent } from "../notifications/notifications.component";
import { DOCUMENT } from "@angular/common";
import { AppsService } from '../../../modules/portal-module/services/apps.service';
import { FuseConfigService } from '../../../../../@fuse/services/config.service';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../modules/user-management-module/services/api.service';
import { StateManagementService } from '../../../shared-module/services/state-management.service';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';


@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    currentDate: any;
    currentTime: any;
    logedInUsername: string;

    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;

    @ViewChild('notificationButton') notificationButton: ElementRef;

    notificationRef: MatDialogRef<NotificationsComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;
    public theme: string;

    appsList: any;


    /**
     * Constructor
     *
     * @param document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     * @param _dialog
     */
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _dialog: MatDialog,
        private appsService: AppsService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private stateManagementService: StateManagementService,

    ) {
        this.navigation = navigation;
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     *
     * return sidebar folded status
     *
     */
    get isSidebarFolded(): boolean {
        return this._fuseSidebarService.getSidebar('navbar') ? this._fuseSidebarService.getSidebar('navbar').folded : true;
    }

    /**
     *
     * return sidebar opened status
     *
     */
    get isSidebarOpened(): boolean {
        return this._fuseSidebarService.getSidebar('navbar') ? this._fuseSidebarService.getSidebar('navbar').opened : false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // console.log(this.authenticationService.isLoggedIn());
        
        if (this.authenticationService.isLoggedIn()) {
            // Loged in user data
            this.authenticationService.logedInUser().subscribe((res) => {
                // console.log(res);
                this.logedInUsername = res.userName;
                // console.log(this.logedInUsername);
            })
        }


        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
                this.theme = settings.colorTheme;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

        // Set the app list in the poopover

        // this.appsService.currentAppList().subscribe((data) => {
        //     this.appsList = data;            
        // })
        this.appsService.currentAppList.subscribe((data) => {
            this.appsList = data;
        });

        var theme;
        this.stateManagementService.currentTheme.subscribe((res) => {
            theme = res;
        });

        var state;
        this.stateManagementService.currentTime.subscribe((res) => {
            state = res;
        })

        this.currentDate = moment.tz(state).format('YYYY-MM-DD');

        setInterval(() => {
            this.currentTime = moment.tz(state).format('HH:mm:ss'); //= Date.now();

            // console.log(moment.tz('Europe/Athens'));
            // console.log(moment().format('dddd MMM DD YYYY HH:MM:SS Z'))

            // console.log(moment.tz("Europe/Athens").format('YYYY-MM-DD HH:mm:ssZ'));
            // console.log(state);

        }, 1000);

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpened(): void {
        if (!this._fuseSidebarService.getSidebar("navbar")) {
            this._fuseConfigService.getConfig()
                .pipe(
                    take(1)
                )
                .subscribe(
                    e => {
                        e.layout.navbar.hidden = false;
                        e.layout.navbar.folded = false;
                        this._fuseConfigService.setConfig(e, { emitEvent: true });
                    }
                );
            return;
        }
        this._fuseSidebarService.getSidebar("navbar").toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     *
     * return current Time
     *
     */
    getTime() {
        return new Date();
    }

    /**
     *
     * create notifications modal
     *
     */
    loadNotifications() {
        if (this.notificationRef && this.notificationRef.componentInstance) {
            this.notificationRef.close();
            this.notificationRef = null;
            return;
        }
        this.notificationRef = this._dialog.open(NotificationsComponent, {
            hasBackdrop: true,
            position: {
                top: `${this.notificationButton.nativeElement.offsetHeight + 10}px`,
                right: `${this.getPositionRight()}px`
            },
            backdropClass: 'backdrop-hidden',
            panelClass: 'notifications-dialog'
        })
    }

    private getPositionRight(): number {
        return this.document.body.clientWidth > 600 ? this.document.body.clientWidth -
            (this.document.body.clientWidth -
                this.document.body.getElementsByTagName('toolbar')[0].clientWidth) -
            this.notificationButton.nativeElement.offsetLeft -
            this.notificationButton.nativeElement.offsetWidth : 20;
    }


    logout() {
        this.authenticationService.logout()
            .subscribe(success => {
                console.log('logout', success);
                if (success) {
                    this.router.navigate(['/login']);
                }
            });
    }

    test() {
        console.log('test', this.authenticationService.isLoggedIn());


    }

}
