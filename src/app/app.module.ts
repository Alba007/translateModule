import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import 'hammerjs';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
// import {FuseModule} from "@fuse/fuse.module";
import { fuseConfig } from './fuse-config';
import { SharedModule } from "./shared-module/shared.module";
import { CustomHttpLoaderFactory } from "./shared-module/customLanguageHttpLoader";
import { SsoModule } from "../../sso-implementation/sso.module";
import { environment } from "../environments/environment";
import { CookieService } from 'ngx-cookie-service';
import { SSOConfigFactory, SSOConfigService } from "../../sso-implementation/config/SSOConfigService";
import { JwtInterceptor } from "../../sso-implementation/interceptors/jwt-interceptor.service";
import { ErrorInterceptor } from "../../sso-implementation/interceptors/error-interceptor.service";
import { Error404Component } from './base-layout/components/404/error-404.component';
import { FuseModule } from '../../@fuse/fuse.module';
import { AuthModule } from './auth/auth.module';

registerLocaleData(localeIt, 'it');
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// // AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
//     return new TranslateHttpLoader(httpClient);
//   }

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        Error404Component
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            progressBar: true,
            maxOpened: 10,
            tapToDismiss: true,
            newestOnTop: true
        }),
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        FuseModule.forRoot(fuseConfig),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                // useFactory: CustomHttpLoaderFactory,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        // SsoModule.forRoot(environment)
        AuthModule
    ],
    bootstrap: [AppComponent],
    providers: [
        CookieService,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: SSOConfigFactory,
        //     deps: [SSOConfigService],
        //     multi: true
        // },
        [
            { provide: APP_BASE_HREF, useValue: '/' },
            // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
            // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
        ]
    ]


})
export class AppModule {

}

