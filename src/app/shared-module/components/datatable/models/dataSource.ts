import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { ApiService } from '../services/api.service';

export class MyDataSource extends DataSource<any[]>{

    private subject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public data;
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;
  
    constructor(private apiService: ApiService) {
      super();
    }
  
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.subject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
    }

    public loadData(path, paginator, sort){
      this.loadingSubject.next(true);
      this.apiService.getData(path, paginator,sort).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe({
        next: value => {
          this.subject.next(value.content);
          this.data = value.content;
          this.totalElements = value.totalElements;
        }
      })
    }
  
  }