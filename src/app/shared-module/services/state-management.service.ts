import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

constructor() { }
/** Time */
 private clock = new BehaviorSubject<string>(moment.tz.guess(true));
 currentTime = this.clock.asObservable();


 changeTime(message: string) {
   this.clock.next(message);
 }

 /**Theme */
 private theme = new BehaviorSubject<string>('theme-dark-blue');
 currentTheme = this.theme.asObservable();


 changeTheme(message: string) {
   this.theme.next(message);
 }
}
