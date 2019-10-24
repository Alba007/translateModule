import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public connected$ = new BehaviorSubject<boolean>(false);
  // private config = 'http://ovh1.rayonit.com:4001';
  public connState: boolean;
  private source = interval(3000);

  constructor(private _http: HttpClient) {

  }

  connectionCheck(config: string) {
    this.source.subscribe(() => {
      this._http.get(config, { observe: 'response', responseType: 'text' })
        .pipe(first())
        .subscribe(res => {
          if (res.status === 200) {
            this.connected(true);
          } else {
            this.connected(false);
          }
        }), (error) => this.connected(false);
    });

    this.connected$.subscribe(connected => {
      console.log('Connected: ', connected);

    });
  }

  connected(data: boolean): void {
    this.connState = data;
    this.connected$.next(data);
  }

}
