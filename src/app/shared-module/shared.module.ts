import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
// import {FuseSharedModule} from "@fuse/shared.module";
// import {FuseConfirmDialogModule} from "@fuse/components";
import {BaseLayoutModule} from "../base-layout/base-layout.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule } from '../../../@fuse/components';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataListModule } from './data-list-module/data-list.module';
import { CustomDataTableModule } from '../modules/custom-data-table/custom-data-table.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        // DataListComponent,
        // MultipleActionsComponent,
        // SortComponent,
        // SearchComponent
    ],
    imports: [
        CommonModule, 
        MaterialModule,
        FuseSharedModule,
        BaseLayoutModule,
        FuseConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        // TranslateModule
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                // useFactory: CustomHttpLoaderFactory,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        CustomDataTableModule,
        DataListModule
    ],
    exports: [
        MaterialModule,
        FuseSharedModule,
        BaseLayoutModule,
        FuseConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CustomDataTableModule,
        DataListModule
    ]
})
export class SharedModule {
} 
