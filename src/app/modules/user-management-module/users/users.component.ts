import { Component, OnInit, ApplicationRef, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
// import { UsersTestComponent } from '../users-test/users-test.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
// import { TableSettingsComponent } from '../table/table-settings/table-settings.component';
import { DatatableService } from '../services/datatable.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { DataTableOptions } from '../models/data-table-options';

// interface DataTableOptions {
//   dynamicColumns: string[],
//   secondaryDynamicColumns?: string[]
//   actions: string[],
//   select: string[],
//   extraDetail: string[]
//   datasource: any,
// }
interface UserTest {
  id: string;
  role: string;
  username: string;
  status: string;
  firstname: string;
  lastname: string;
  email: string;
}
const ELEMENT_DATA: any[] = [
  {
    id: '1',
    role: 'Admin',
    username: 'administrator',
    status: 'active',
    firstname: 'rigers',
    lastname: 'saliu',
    email: 'test@gmail.com',
    test: 'llllll',
    test2: 'rs',
    date: '2018-10-05T16:40:17.000Z'
  },
  {
    id: '2', role: 'Admin2', username: 'administrator2', status: 'active', firstname: 'test2', lastname: 'test2', email: 'test2@gmail.com',
  },
  {
    id: '3', role: 'Admin3', username: 'administrator3', status: 'active', firstname: 'test3', lastname: 'test3', email: 'test3@gmail.com',
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com',
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com',
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com',
  }
]
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fuseAnimations]
})
export class UsersComponent implements OnInit {

  options: DataTableOptions;
  // options: DataTableOptions = {
  //   dynamicColumns: ['id', 'role', 'username', 'status', 'test'],
  //   secondaryDynamicColumns: ['firstname', 'lastname', 'email'],
  //   actions: ['actions'],
  //   select: ['select'],
  //   extraDetail: ['expandedDetail'],
  //   datasource: ELEMENT_DATA,
  // }


  // @ViewChild(UsersTestComponent)
  // component: UsersTestComponent;



  constructor(
    private appRef: ApplicationRef,
    private dialog: MatDialog,
    private datatableService: DatatableService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.datatableService.currentSelectedOptions.subscribe((data) => {
      // console.log('servisi ',data);
      this.options = data;
    })
  }

  test() {
    this.options.secondaryDynamicColumns = [];

    console.log('test');
    // console.log('options=> ', this.component.options);
    // // setTimeout(() => {
    //   this.component.dataTableInit();
    // // }, 1000);

    //  this.component.options.secondaryDynamicColumns = [];
    // this.appRef.tick();
    // this.cd.detectChanges()
  }

  /** Add new User */
  addNewUser() {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddEditUserComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(() => {

        /** Update table content */
        // this.loadUsers();
      }
      );

  }

}
