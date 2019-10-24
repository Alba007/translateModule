import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { UserService } from '../services/user.service';
import { DataTableOptions } from '../models/data-table-options';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fuseAnimations]
})
export class UserComponent implements OnInit {

  options: DataTableOptions = {
    title: 'Users',
    dynamicColumns: ['systemRole', 'username', 'firstName', 'lastName'],
    secondaryDynamicColumns: [],
    actions: ['actions'],
    showActions: true,
    select: ['select'],
    showSelect: true,
    extraDetail: [],
    showExtraDetail: true,
    showSearchFilter: false,
    searchFilters: [
      { type: 'date', name: 'date Test' },
      { type: null, name: 'one' },
      { type: null, name: 'two' }
    ],
    paginatorOptions: {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: [1, 5, 10, 25, 100],
    },
    datasource: [],
  };

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  /**Recive data from child component */
  receiveMessage($event) {
    // console.log($event)

    switch ($event.type) {
      case 'add': {
        this.addEditUser();
        break;
      }
      case 'edit': {
        this.addEditUser($event.row);
        break;
      }
      case 'delete': {
        this.deleteUser($event.row);
        break;
      }

    }
  }

  loadUsers() {
    this.userService.getUser().subscribe((data) => {
      // console.log(data);

      this.options.datasource = data;
      this.options = { ...this.options };
    });
  }

  /** Add new User */
  addEditUser(user?) {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = user;
    dialogConfig.width = 800 + 'px';

    const dialogRef = this.dialog.open(AddEditUserComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(() => {

        /** Update table content */

        setTimeout(() => {
          this.loadUsers();
        }, 1000);

      }
      );
  }

  deleteUser(user) {
    user.active = false;

    this.userService.addUser(user)
      .subscribe(
        () => {
          console.log('User Deleted !', user);
          this.loadUsers();
        },
        console.error
      );

    // this.userService.deleteUser(user.id)
    //   .subscribe(
    //     () => {
    //       console.log('User Deleted !');
    //       this.loadUsers();
    //     },
    //     console.error
    //   );
  }

}
