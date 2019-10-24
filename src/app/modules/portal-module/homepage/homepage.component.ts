import { Component, OnInit } from '@angular/core';
import { AppsService } from '../services/apps.service';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { AddEditAppComponent } from '../add-edit-app/add-edit-app.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ApplicationI } from '../models/applicationi';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: fuseAnimations
})
export class HomepageComponent implements OnInit {

  appsList: any;

  constructor(
    private appsService: AppsService,
    private dialog: MatDialog,
    public conn: ConnectionService
  ) { }

  ngOnInit() {
    this.loadApps();

    // this.conn.connectionCheck('http://ovh1.rayonit.com:4001');
    // this.conn.connectionCheck('https://jsonplaceholder');

    // this.conn.connected$.subscribe(data => {
    //   console.log(data);

    // });
  }

  loadApps() {
    this.appsService.getApps().subscribe((data) => {
      // console.log(data);

      this.appsList = data;
      this.appsService.changeAppList(data);
    })
  }

  /** Add Edit App */
  addEditApp(editApp?: ApplicationI) {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = editApp;
    dialogConfig.width = '35em';
    // dialogConfig.panelClass = 'custom-dialog-container';

    // dialogConfig.position = {top: '35em'}

    const dialogRef = this.dialog.open(AddEditAppComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((data) => {

        if (data !== '') {

          /** Update content */
          setTimeout(() => {
            this.loadApps();
          }, 1500);
        }
      }
      );
  }

  deleteApp(app) {

    this.appsService.deleteApps(app.id)
      .subscribe(
        () => {
          console.log('App Deleted !');
          // this.loadApps()
          const index = this.appsList.indexOf(app);
          if (index != -1) {
            this.appsList.splice(index, 1);
          }
        },
        console.error
      );
  }

}
