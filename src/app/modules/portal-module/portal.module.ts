import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../@fuse/components';
import { AddEditAppComponent } from './add-edit-app/add-edit-app.component';
import { AppDynamicRolesComponent } from './app-dynamic-roles/app-dynamic-roles.component';

@NgModule({
  declarations: [
    HomepageComponent,
    AddEditAppComponent,
    AppDynamicRolesComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FuseSharedModule,
    FuseWidgetModule,
  ],
  entryComponents: [
    AddEditAppComponent
  ]
})
export class PortalModule { }
