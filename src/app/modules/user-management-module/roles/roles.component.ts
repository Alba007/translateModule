import { Component, OnInit, ChangeDetectorRef, ApplicationRef, NgZone, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { MatDialogConfig, MatDialog, MatDrawer } from '@angular/material';
import { AddEditRolesComponent } from '../add-edit-roles/add-edit-roles.component';
import { RoleService } from '../services/role.service';
import { DataTableOptions } from '../models/data-table-options';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  animations: [fuseAnimations]
})
export class RolesComponent implements OnInit {

  options: DataTableOptions = {
    title: 'Roles',
    dynamicColumns: ['name', 'type'],
    secondaryDynamicColumns: [],
    actions: ['actions'],
    showActions: true,
    rowActions: [],
    tableActions: [],
    select: ['select'],
    showSelect: true,
    extraDetail: ['expandedDetail'],
    showExtraDetail: true,
    showSearchFilter: true,
    searchFilters: [
      { type: 'date', name: 'date' },
      { name: 'one' },
      { type: 'date', name: 'two' },
      { type: null, name: 'three' }
    ],
    paginatorOptions: {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: [1, 5, 10, 25, 200],
    },
    datasource: [],
    // searchFilters: ['date', 'one', 'two', 'three', 'four', 'five']

  };

  rowData: any;

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private dialog: MatDialog,
    private roleService: RoleService,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadRoles();
  }

  /**Recive data from child component APP-TABLE */
  receiveMessage($event) {
    console.log($event);

    switch ($event.type) {
      case 'add': {
        this.addRole();
        break;
      }
      case 'edit': {
        // this.addEditRole($event.row);
        this.rowData = $event.row;
        /** Fixed the problem when mode is side (drawer goes over) */
        setTimeout(() => {
          this.drawer.open();

        }, 200);

        break;
      }
      case 'delete': {
        this.deleteRole($event.row);
        break;
      }
      case 'filter': {
        this.apiService.getData($event).subscribe((data) => {
          // console.log(data);
          this.options.datasource = data;
        });
        break;
      }
      case 'view': {
        this.rowData = $event.row;

        /** Fixed the problem when mode is side (drawer goes over) */
        setTimeout(() => {
          this.drawer.open();
        }, 200);

        break;
      }
    }
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((data) => {
      // console.log(data);

      this.options.datasource = data;
      /** Should do to update the options properties */
      this.options = { ...this.options };

    });
  }

  /** Add new Role */
  addRole() {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = role;
    dialogConfig.width = 500 + 'px';
    // dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(AddEditRolesComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((data) => {
        console.log('prgj', data);
        // this.options.datasource.push(...data);
        // this.options = { ...this.options };

        /** Update table content */
        this.loadRoles();
        // setTimeout(() => {
        //   this.loadRoles();
        // }, 2000);
      }
      );
  }

  /**Recive data from child component ADD-EDIT-ROLE */
  editRole(data) {
    console.log('edited', data);


    // setTimeout(() => {
    this.loadRoles();
    // }, 2000);
  }

  deleteRole(role) {

    this.roleService.deleteRole(role.id)
      .subscribe(
        () => {
          console.log('Role Deleted !');
          this.loadRoles();

        },
        console.error
      )
  }

  test() {
    // this.zone.run(() => {

    // })

    this.options.datasource = [{
      active: false,
      description: "administrator",
      id: "5cbf2b2d63db4c606e22afac",
      name: "test"
    }];

    /**Need to fire change dedection when a property of option Object change value */
    this.options = { ...this.options };

    // this.cd.detectChanges();
    // this.appRef.tick();

  }

}
