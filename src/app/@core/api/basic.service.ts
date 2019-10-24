import { BehaviorSubject, Observable } from 'rxjs';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page } from '../../shared-module/components/datatable/models/page';
// import { Page } from '../../shared-module/datatable/models/page';

export class BasicService<T> implements Resolve<any>{

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  routeParams: any;
  item: T;
  itemsSubject: BehaviorSubject<T[]>;
  onDataChange: BehaviorSubject<any>;
  domain: string;

  constructor(public http: HttpClient, domain?: string) {
    this.domain = domain;
    this.onDataChange = new BehaviorSubject<any>({});
    this.itemsSubject = new BehaviorSubject<T[]>([]);
    console.log('domain => ', domain);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getItemById()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getItemById(id?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onDataChange.next(false);
        resolve(false);
      }
      else {
        this.http.get(this.domain + ( id ? id : this.routeParams.id))
          .subscribe((response: any) => {
            this.item = response;
            this.onDataChange.next(this.item);
            resolve(response);
          }, reject);
      }
    });
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.domain, this.httpOptions).pipe(map(res => {
      return res;
    }));
  }

  save(item: T): Observable<T> {
    return this.http.post<T>(this.domain, item, this.httpOptions).pipe(map(res => {
      return res;
    }));
  }

  edit(item: T): Observable<T> {
    const url = `${this.domain}`;
    return this.http.put<T>(url, item, this.httpOptions).pipe(map(res => {
      return res;
    }));
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.domain}/${id}`;
    return this.http.delete<void>(url, this.httpOptions).pipe(map(res => {
      return res;
    }));
  }

  getAllPaginated(page: number, size: number): Observable<Page<T>> {
    const url = `${this.domain}?page=${page}&size=${size}`;
    return this.http.get<Page<T>>(url , this.httpOptions).pipe(map((page: Page<T>) => { 
      this.itemsSubject.next(page.content);
      return page; 
  }));    
  }
}
