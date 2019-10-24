import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface SearchFilter {
  pageIndex: any;
  pageSize: any;
  pageLength: any;
  filters: any[];
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private configUrl: string = environment.domain;

  constructor(private _http: HttpClient) { }


  getData(filterObject: SearchFilter): Observable<any> {

    console.log('objekti', filterObject);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    /*Filters from paginator */
    let filtersParam = new HttpParams()
      .append('pageIndex', filterObject.pageIndex || 0)
      .append('pageSize', filterObject.pageSize || 10);
    // /*
    //   ! Check later
    //   */
    // if (filterObject.pageLength) {
    //   filtersParam.set('pageLength', filterObject.pageLength);
    // }

    /**Filter from search */
    if (filterObject.filters) {
      for (let i = 0; i < filterObject.filters.length; i++) { 
        const res = filterObject.filters[i];
        filtersParam = filtersParam.append(res.key, res.value);
      }
     
      // for(let res of filterObject.filters) {
      //   filtersParam = filtersParam.append(res.key, res.value);
      // }
     
      // filterObject.filters.forEach((res) => {
      //   console.log('saliu', res);

      //   filtersParam = filtersParam.append(res.key, res.value);
      // });
    }

    return this._http.post<any[]>(`${this.configUrl}/test`, {}, { headers: headers, params: filtersParam });
  }
}
