import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSearchBarModule, FuseShortcutsModule } from '../../../../../@fuse/components/index';
// import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from './toolbar.component';
import {MaterialModule} from "../../../material.module";
import {QuickPanelModule} from "../quick-panel/quick-panel.module";
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { MdePopoverModule } from '@material-extended/mde';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        BreadcrumbComponent
    ],
    imports     : [
        RouterModule,
        MaterialModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        QuickPanelModule,
        MdePopoverModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
