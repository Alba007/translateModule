import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { TestDataListComponent } from './test-data-list/test-data-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'roles',
    pathMatch: 'full'
  },
  { path: 'roles', component: RolesComponent },
  { path: 'user', component: UserComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'users', component: UsersComponent },
  { path: 'testDataList', component: TestDataListComponent}
 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UserManagementRoutingModule { }
