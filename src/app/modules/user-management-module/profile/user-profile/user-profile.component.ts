import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
// import * as moment from 'moment-timezone';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { StateManagementService } from '../../../../shared-module/services/state-management.service';
// import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  // Private
  _unsubscribeAll: Subject<any>;

  logedInUser: any;
  languages: string[] = ['English'];
  timezones: any;
  themeOptions: any[] = [
    { key: 'Light Theme', value: 'theme-yellow-light' },
    { key: 'Light Dark Theme', value: 'theme-yellow-dark-light' },
    { key: 'Dark Gray Theme', value: 'theme-dark-gray' },
    { key: 'Dark Blue Theme', value: 'theme-dark-blue' },
  ];
  filteredOptions: Observable<string[]>;

  form = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    username: this.fb.control(''),
    email: this.fb.control(''),
    currentPassword: this.fb.control(''),
    newPassword: this.fb.control(''),
    confirmPassword: this.fb.control(''),
    theme: this.fb.control(''),
    language: this.fb.control('English'),
    timezone: this.fb.control(moment.tz.guess(true))
  });
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private stateManagementService: StateManagementService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public translateService: TranslateService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // Loged in user data
    this.authenticationService.logedInUser().subscribe((res) => {

      this.logedInUser = res;

      this.form.patchValue({
        firstName: this.logedInUser.name,
        lastName: this.logedInUser.lastName,
        username: this.logedInUser.userName,
        email: this.logedInUser.email,
      });
    });


    this.getTimezones();

    this.filteredOptions = this.form.get('timezone').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
        takeUntil(this._unsubscribeAll)
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** Chenge Password */
  changePassword() {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.width = 500 + 'px';

    const dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((data) => {

        console.log(data);
        const password = {
          oldPass: data.currentPassword,
          newPass: data.newPassword
        };

        if (password.oldPass && password.newPass) {
          this.userService.resetPassword(password)
            .subscribe(
              (res) => {
                console.log('PassWord Reset', res);

              },
              console.error
            );

        }



      }
      );
  }

  getTimezones() {
    this.timezones = moment.tz.names()
    // console.log(this.timezones);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.timezones.filter(option => option.toLowerCase().includes(filterValue));
  }

  setTimezone(timezone) {
    console.log(timezone);

    console.log(moment.tz(timezone).format('Z'))
  }

  clear($event) {
    // this.form.patchValue({
    //   timezone: ''
    // })
    this.form.get('timezone').setValue('')
    $event.stopPropagation();

    // setTimeout(() => {
    //   this.form.controls['timezone'].focus()

    // }, 2000);

  }

  saveProfile() {
    const profile: any = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      email: this.form.value.email,
      currentPassword: this.form.value.currentPassword,
      newPassword: this.form.value.newPassword,
      confirmPassword: this.form.value.confirmPassword,
      colorTheme: this.form.value.theme,
      language: this.form.value.language,
      timezone: moment.tz(this.form.value.timezone).format('Z')
    }
    console.log('Save: ', profile);

  }

  // setTimezone(event) {
  // this.timezoneName = event.toString();
  // this.selectedTimezone = this.timezoneName;
  //   moment.tz(this.timezoneName).zoneName();
  //   this.applicationSettings.timezone = moment.tz(this.timezoneName).format('Z');
  //   return this.filteredTimezones = this.timezones.filter(timezone => (
  //     timezone.toLowerCase().includes(this.timezoneName.toLowerCase()) || moment.tz(timezone).format('Z').includes(this.timezoneName))
  //   );
  // }

  save() {
    this.stateManagementService.changeTime(this.form.value.timezone);
  }

}
