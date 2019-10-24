import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppsService } from '../../portal-module/services/apps.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  title = 'Add';

  roles: any[] = [];
  applications: any[] = [];
  show = false;
  /*
       !ENDPOINT  DONE
 */
  portalRoles: string[]; // = ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_TEMP'];
  // appsList: any;
  /*
       !ENDPOINT
   */
  allAppAndRoles: any[] = [];
  /*
  allAppAndRoles = [
    {

      applicationName: "test1",

      roleName:

        ["maintainer"]

    },

    {

      applicationName: "test2",

      roleName: ["admin"]

    },
    {
      applicationName: 'Tolling',
      roleName: ['none', 'admin', 'ss']
    },
    {
      applicationName: 'Smart Scada',
      roleName: ['none', 'superadmin', 'admin', 'operator', 'guest']
    },
    {
      applicationName: 'Cartographic',
      roleName: ['none', 'admin', 'operator', 'guest']
    },
    {
      applicationName: 'Dss',
      roleName: ['none', 'superadmin', 'guest']
    },
    {
      applicationName: 'TEST',
      roleName: ['none', 'superadmin1', 'guest1']
    },
    {
      applicationName: 'TEST2',
      roleName: ['none', 'superadmin1', 'guest1']
    }
  ];
*/
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    private roleService: RoleService
    // private appsService: AppsService,
  ) { }

  form = this.fb.group({
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control(''),
    username: this.fb.control('', [Validators.required]),
    email: this.fb.control(''),
    password: this.fb.control('', [Validators.required]),
    // confirmPassword: this.fb.control(''),
    roles: this.fb.control('none'),
    rolesPerApp: this.fb.array([])
  });

  ngOnInit() {
    // this.appsService.getApps().subscribe((data) => {
    //   this.appsList = data;
    // })
    this.getSystemRoleList();
    // this.getAppsRoleList();
    this.roleService.getAppsRoleList().subscribe((data) => {
      this.allAppAndRoles = data;
      if (this.data) {
        this.title = 'Edit';

        this.allAppAndRoles.forEach((app) => {
          this.roles.push(app.roleName);
          this.applications.push(app.applicationName)
        });

        this.editUser();

      } else {

        this.allAppAndRoles.forEach((app) => {
          this.roles.push(app.roleName);

          this.addRole(null, app);

        });

      }
    });



  }

  editUser() {
    console.log('edit', this.data);

    this.form.patchValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      username: this.data.username,
      email: this.data.email,
      password: this.data.password,
      roles: this.data.systemRole,
    })
    // Temp is need to add roles of a new app to user when EDIT
    const temp = [];
    if (this.data.applicationRoles) {
      this.data.applicationRoles.forEach((elem) => {
        temp.push(elem.applicationName);
        /* this check is done for the case when an app is deleted and edit the user
            we dont want to show the deleted app - roles
        */
        if (this.applications.includes(elem.applicationName)) {
          this.addRole(elem, null);
        }
      });
    }

    // add roles of a new app to user when EDIT
    this.allAppAndRoles.forEach((app) => {

      if (!temp.includes(app.applicationName)) {
        this.addRole(null, app);
      }

    });

  }

  addUser() {
    const applicationRoles = this.form.value.rolesPerApp.map(app => {
      return { ...app, roleName: [app.roleName] };
    });
    // this.form.value.rolesPerApp.forEach((elem)=>{
    //   let temp: any = {}
    //   temp.applicationName =elem.applicationName,
    //   temp.roleName = [elem.roleName];
    //   applicationRoles.push(temp);
    // })

    const user: User = {

      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      systemRole: this.form.value.roles,
      applicationRoles: applicationRoles,
      active: true
    };

    // edit case
    if (this.data) {
      user.id = this.data.id;
      delete user.password;

      this.userService.editUser(user)
        .subscribe(
          () => {
            console.log('User Edited !');
            this.dialogRef.close(user);
          },
          console.error
        );

    }

    // add case
    this.userService.addUser(user)
      .subscribe(
        () => {
          console.log('New user added !');
          this.dialogRef.close(user);
        },
        console.error
      );

  }

  passGenerator() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    let password = '_' + Math.random().toString(36).substr(2, 9);
    this.form.patchValue({
      password: password
    });
  }

  viewPass() {
    this.show = !this.show;
  }

  /*
   *  Dynamic Form
   */
  get roleForms() {
    // return them as a form array
    return this.form.get('rolesPerApp') as FormArray;
  }

  addRole(elem?: any, app?: any) {

    let roleApp;
    if (elem) {
      roleApp = this.fb.group({
        applicationName: elem.applicationName,
        roleName: elem.roleName
      });
    }
    if (app) {
      roleApp = this.fb.group({
        applicationName: app.applicationName,
        roleName: 'none'
      });
    }

    this.roleForms.push(roleApp);

  }

  deleteRole(i) {
    this.roleForms.removeAt(i);
  }

  deleteAllRoles() {
    while (this.roleForms.length !== 0) {
      this.roleForms.removeAt(0);
    }
  }

  getSystemRoleList() {
    this.roleService.getSystemRoleList().subscribe((data) => {
      // console.log(data);

      this.portalRoles = data;
    });
  }

  getAppsRoleList() {
    this.roleService.getAppsRoleList().subscribe((data) => {
      this.allAppAndRoles = data;
    });
  }

}
