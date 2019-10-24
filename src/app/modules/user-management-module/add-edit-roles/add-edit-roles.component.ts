import { Component, OnInit, Optional, Inject, ViewChild, Output, EventEmitter, Input, SimpleChanges, OnChanges, DoCheck, AfterContentInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Role } from '../models/role';
import { RoleService } from '../services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect } from '@angular/material';
import { AppsService } from '../../portal-module/services/apps.service';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.scss']
})
export class AddEditRolesComponent implements OnInit, OnChanges, DoCheck {
  title = 'Add';

  appList: string[] = []; // = ['Tolling', 'DSS', 'SmartScada', 'Cartographic'];
  showAppList: boolean;
  showAddAnother = true;
  editAppList: string[] = [];

  // Data from selected row
  @Input() data: any;
  // Emitter to close the drawer
  @Output() closeButton = new EventEmitter<boolean>();
  // Emitter for the edited data
  @Output() rowEdited = new EventEmitter<any>();

  form = this.fb.group({
    type: this.fb.control('SYSTEM'),
    roles: this.fb.array([], [Validators.required])
  });

  constructor(
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleService: RoleService,
    @Optional() private dialogRef: MatDialogRef<AddEditRolesComponent>,
    private appsService: AppsService
  ) { }

  ngOnInit() {
    // App list from the server
    this.appsService.getApps().subscribe((appList) => {
      appList.map((res) => {
        this.appList.push(res.applicationName);
      });
    });

    this.addNewRole();


    // change view of the form for App & System roles
    this.form.valueChanges.subscribe((data) => {
      if (this.form.value.type == 'APPLICATION') {
        this.showAppList = true;
      } else {
        this.showAppList = false;

      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // console.log(this.data);
    this.data = changes.data.currentValue;
    // console.log('DATA', this.data);

    if (this.data) {
      this.deleteAllRoles();
      
      this.title = 'Edit';
      this.showAddAnother = false;

      this.roleService.getAppsRoleList().subscribe((data) => {
        this.editAppList = [];
       
        data.map((elem) => {
          if (elem.roleName.includes(this.data.name)) {
            this.editAppList.push(elem.applicationName);
          }
        });

        this.editRole();
      });
    }
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log(this.inputData);
    // console.log(this.data)
  }


  addRoles() {

    let role = [];

    if (this.form.value.type == 'SYSTEM') {

      role = this.form.value.roles;

      if (this.data) {
        role[0].id = this.data.id;
      }

      this.roleService.addSystemRole(role)
        .subscribe(
          (serverResSystem) => {
            console.log('serverRes', serverResSystem);

            
            if (this.dialogRef) {
              console.log('New SYSTEM Role Added !');
              this.dialogRef.close(serverResSystem);
            }
            else {
              console.log('SYSTEM Role Edited !');
              this.rowEdited.emit(serverResSystem);
            }
          },
          console.error
        );
    } else if (this.form.value.type == 'APPLICATION') {

      this.form.value.roles.map((res) => {

        const temp = {
          roleName: res.name,
          applicationName: res.applications
        };

        role.push(temp);

        this.roleService.addApplicationRole(role)
          .subscribe(
            (serverResApplication) => {
              console.log('serverRes', serverResApplication);
              
              if (this.dialogRef) {
                console.log('New APPLICATION Role added !');

                this.dialogRef.close(role);

              } else {
                console.log('APPLICATION Role Edited!');

                this.rowEdited.emit(role);
              }

            },
            console.error
          );
      });
    }
  }

  editRole() {

    this.addNewRole(this.data);

    this.form.patchValue({
      type: this.data.type,
    }
    );
  }


  /*
  *  Roles FORM
  */
  // getter that retrive the filed from the form
  get rolesForms() {
    // return them as a form array
    return this.form.get('roles') as FormArray;
  }

  addNewRole(data?) {

    let role: any;

    if (data) {
      if (this.data.type == 'APPLICATION') {
        role = this.fb.group({
          name: [this.data.name, [Validators.required]], // this.data.name,
          type: this.data.type,
          description: null,
          applications: this.fb.control(this.editAppList)
        });
      } else {
        role = this.fb.group({
          name: [this.data.name, [Validators.required]], // this.data.name,
          type: this.data.type,
          description: null,
          applications: ''
        });
      }

    } else {
      role = this.fb.group({
        name: ['', [Validators.required]], // '',
        type: 'SYSTEM',
        description: null,
        active: true,
        applications: ''
      });
    }
    this.rolesForms.push(role);
  }

  deleteRole(i) {
    this.rolesForms.removeAt(i);
  }

  deleteAllRoles() {
    while (this.rolesForms.length !== 0) {
      this.rolesForms.removeAt(0);
    }
  }

  close() {
    // Close Dialog
    if (this.dialogRef) {
      this.dialogRef.close();
    } 
    // Close Drawer
    else {
      this.closeButton.emit(true);
    }

  }

  // TEST SELECT ALL
  @ViewChild('select') select: MatSelect;
  selectedValues
  allchecked
  onAllChanged(checked: any) {
    if (checked) {
      this.select.value = this.appList//add all your choices 
    } else {
      this.select.value = [];
    }
  }

  selectionchanged() {
    if (this.selectedValues.length === this.appList.length) {
      this.allchecked = true;
    } else {
      this.allchecked = false;
    }
  }

  test(a, checked) {

    if (checked) {
      // this.form.get('roles').value[a].applications = this.appList;
      this.rolesForms.value[a].applications = this.appList
    } else {
      // this.form.get('roles').value[a].applications = [];
      this.rolesForms.value[a].applications = []

    }

    // console.log(this.form.get('roles').value[a].applications );
    // this.form.get('roles').value[a].applications.push(...this.appList)
    // console.log(this.form.get('roles').value[a].applications );

  }


}
