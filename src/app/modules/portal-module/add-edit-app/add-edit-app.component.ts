import { Component, OnInit, Inject, Optional, ViewChild, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppsService } from '../services/apps.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApplicationI } from '../models/applicationi';
import { AutoConfigRequest } from '../services/autoconfig.request';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-app',
  templateUrl: './add-edit-app.component.html',
  styleUrls: ['./add-edit-app.component.scss']
})
export class AddEditAppComponent implements OnInit {

  title: string = 'Add';
  editFlag = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private autoConfig: AutoConfigRequest,
    private fb: FormBuilder,
    private appsSerivce: AppsService,
    private dialogRef: MatDialogRef<AddEditAppComponent>,
    private _ngZone: NgZone
  ) { }

  form = this.fb.group({

    applicationName: this.fb.control(''),
    applicationUrl: this.fb.control(''),
    iconUrl: this.fb.control(''),
    description: this.fb.control(''),
    autoconfigApi: this.fb.control('')
  });

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    if (this.data) {
      // console.log(this.data);

      this.title = 'Edit';
      this.editApp();
    }
  }

  addApp() {
    const app: ApplicationI = {
      applicationName: this.form.value.applicationName,
      applicationUrl: this.form.value.applicationUrl,
      iconUrl: this.form.value.iconUrl,
      roles: [],
      description: { 'en': this.form.value.description }
    };

    app.unique = this.uniqueID()

    if (this.data) {
      app.id = this.data.id
      this.appsSerivce.updateApps(app)
        .subscribe(
          () => {

            console.log('App Edited !');
            this.dialogRef.close(app);
          },
          console.error
        );


    } else {

      this.appsSerivce.addApps(app)
        .subscribe(
          () => {

            console.log('New App added !');
            this.dialogRef.close(app);
          },
          console.error
        );

    }

  }

  editApp() {
    this.editFlag = true;
    this.form.patchValue({
      applicationName: this.data.applicationName,
      applicationUrl: this.data.applicationUrl,
      iconUrl: this.data.iconUrl,
      description: this.data.description.en,
    });
  }

  getAppInfo() {
    this.autoConfig.makeRequestToOutside(this.form.value.autoconfigApi).subscribe((data) => {

      this.form.patchValue({
        applicationName: data.name,
        applicationUrl: data.url,
        // iconUrl: data.iconUrl,
        description: data.description,

      });
    });
  }

  uniqueID() {
    let array = new Uint32Array(8)
    window.crypto.getRandomValues(array)
    let str = ''
    for (let i = 0; i < array.length; i++) {
      str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4)
    }
    return str
  }

}
