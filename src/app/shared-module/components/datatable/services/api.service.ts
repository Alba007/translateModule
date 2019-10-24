import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { environment } from 'environments/environment';

@Injectable({
  'providedIn': 'root'
})
export class ApiService{
  data: any[];

  constructor(private httpClient: HttpClient) {
  }

  getData(path,paginator, sort ) : Observable<any> {
    return this.httpClient.get<any[]>(path, {
      params: new HttpParams()
        .set('page', paginator.pageIndex || 0)
        .set('size', paginator.pageSize || 10)
        .set('sort', sort.active || 'id')
        .set('direction', sort.direction.toUpperCase() || 'DESC')
    }).pipe(map((response: any) => {
        this.data = response.content;
        return response;
    }));
  }

  delete(path){
    return this.httpClient.delete<void>(`${path}`).pipe(map(res => {
        return res;
    }));
  }
}
