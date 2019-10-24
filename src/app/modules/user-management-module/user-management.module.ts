import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { RolesComponent } from './roles/roles.component';
import { AddEditRolesComponent } from './add-edit-roles/add-edit-roles.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared-module/shared.module';
import { TestDataListComponent } from './test-data-list/test-data-list.component';
import { TestTemplateComponent } from './test-template/test-template.component';
@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent,
    RolesComponent,
    AddEditRolesComponent,
    UserComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    ProfileComponent, 
    TestDataListComponent,
    TestTemplateComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddEditUserComponent,
    AddEditRolesComponent,
    ChangePasswordComponent
  ]
})
export class UserManagementModule { }
