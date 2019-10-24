import { Component, OnInit } from "@angular/core";

import { IconsService } from "./modules/system-configuration/services/icons.service";
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ngx-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private iconsService: IconsService,
        public translateService: TranslateService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,

    ) {

        // Run icons service
        this.iconsService.register();

        // Translation
        translateService.addLangs(['en', 'sq']);
        translateService.setDefaultLang('sq');
        const browserLanguage = translateService.getBrowserLang();
        translateService.use(browserLanguage.match(/en|sq/) ? browserLanguage : 'en');
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initBrowserTabTittle();
    }

    initBrowserTabTittle() {

        // Dynamic tab name(title)

        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route) => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            mergeMap((route) => route.data))
            .subscribe((event) => {
                if (event['title'] === undefined) {
                    this.titleService.setTitle('EFlow');
                } else {
                    this.titleService.setTitle(event['title']);

                }
            }
            );
    }
}

