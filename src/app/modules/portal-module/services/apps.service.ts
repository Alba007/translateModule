import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { retry } from 'rxjs/operators';
import { ApplicationI } from '../models/applicationi';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  public configUrl: string = environment.domain + '/api/v1/applications';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  appsList = [

    {
      name: 'Tolling', iconUri: '../../../../assets/app-icons/toll sight.svg', uri: 'http://ovh1.rayonit.com:4333', description: 'Supervisory and control of road assets.'
    },
    {
      name: 'SmartScada', iconUri: '../../../../assets/app-icons/scada sight.svg', uri: 'http://ovh1.rayonit.com:4001', description: 'Supervisory and control of road assets.'
    },
    {
      name: 'Cartographic', iconUri: '../../../../assets/app-icons/carto sight.svg', uri: 'http://ovh1.rayonit.com:9300', description: 'Supervisory and control of road assets.'
    },
    {
      name: 'DSS', iconUri: '../../../../assets/app-icons/dss sight.svg', uri: 'http://ovh1.rayonit.com:', description: 'Supervisory and control of road assets.'
    }
    // {
    //   name: 'Test', iconUri: '5', url: 'https://www.youtube.com', description: 'Supervisory and control of road assets.'
    // }

  ];
  // private appList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // currentAppList(): BehaviorSubject<any> {
  //   return this.appList;
  // }
  // changeAppList(app:any) {
  //   // apply the current value of your appList Subject to a local variable
  //   let myAppList = this.appList.getValue();
  //   // push that app into your copy's array
  //   myAppList.push(app);
  //   // apply the local updated array value as your new array of appList Subject
  //   this.appList.next(myAppList);
  // }
  private appList = new BehaviorSubject<any>([]);
  currentAppList = this.appList.asObservable();

  constructor(private http: HttpClient) { }

  changeAppList(message: any) {
    this.appList.next(message)
  }

  // addApp(app) {
  // this.appsList.push(app)
  // }

  getApps(): Observable<ApplicationI[]> {
    return this.http.get<ApplicationI[]>(`${this.configUrl}/all`);
    // .pipe(
    // retry(3), // retry a failed request up to 3 times
    // catchError(this.handleError) // then handle the error
    // );
  }

  addApps(app: ApplicationI): Observable<ApplicationI> {
    console.log('ser db', app);

    return this.http
      .post<ApplicationI>(`${this.configUrl}`, app);
    // .pipe(
    //   retry(3),
    // catchError(this.handleError) // then handle the error
    // );
  }

  updateApps(app: any): Observable<ApplicationI> {
    return this.http.put<ApplicationI>(`${this.configUrl}`, app, this.httpOptions);
    // .pipe(
    retry(3)
    //   catchError(this.handleError('deleteHero'))
    // );
  }
  deleteApps(id: string): Observable<ApplicationI> {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete<ApplicationI>(url);
    // .pipe(
    retry(3)
    //   catchError(this.handleError('deleteHero'))
    // );
  }
}
