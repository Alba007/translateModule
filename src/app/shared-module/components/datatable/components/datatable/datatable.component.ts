import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { MatSort, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { tap } from 'rxjs/operators';
// import { fuseAnimations } from '@fuse/animations';
// import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MyDataSource } from '../../models/dataSource';
import { DataTableOptions } from '../../models/dataTableOptions';
import { RowClick, EventType, ClickEvent } from '../../models/eventTypes';
import { ApiService } from '../../services/api.service';
import { fuseAnimations } from '../../../../../../../@fuse/animations';
import { FuseConfirmDialogComponent } from '../../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
// import { fuseAnimations } from '../../../../../../@fuse/animations';
// import { FuseConfirmDialogComponent } from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DatatableComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() options: DataTableOptions;
  @Output() dtClick: EventEmitter<any>;

  dataSource: MyDataSource;
  displayedColumns: any[] = [];
  finalDisplayedColumns: any[] = ["checkbox", "buttons"];
  checkboxes = {};
  hasSelectedRows: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  private _unsubscribeAll: Subject<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private apiService: ApiService,
    public _matDialog: MatDialog,
    public toast: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
    this.dtClick = new EventEmitter();
  }

  ngOnInit() {
    this.initColumns();
    this.initDS();
    console.log(this.options);
  }

  initColumns() {
    this.displayedColumns = Object.keys(this.options.displayedColumnsData);
    this.finalDisplayedColumns.splice(1, 0, ...this.displayedColumns);
  }

  initDS() {
    this.dataSource = new MyDataSource(this.apiService);
    this.dataSource.loadData(this.options.path, this.paginator, this.sort);
  }

  getData() {
    this.dataSource.loadData(this.options.path, this.paginator, this.sort);
    this.checkboxes = {};
    this.hasSelectedRows = false;
  }

  getProperty(row, col) {
    const prop = col.split(".");
    let value = row;
    prop.forEach(element => {
      value = value[element];
    });
    return value;
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.getData())
      )
      .subscribe();
  }

  onSelectedChange(contactId): void {
    !this.checkboxes[contactId] && delete this.checkboxes[contactId];
    this.hasSelectedRows = Object.keys(this.checkboxes).length;
  }

  selectionChanged(value) {
    this.checkboxes = {};
    value && this.dataSource.data.forEach(x => {
      this.checkboxes[x.id] = true;
    });
    this.hasSelectedRows = Object.keys(this.checkboxes).length;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  delete(id) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.apiService.delete(this.options.path + '/' + id).subscribe(res => {
            this.toast.success("Successful Action");
            this.getData();
          });
        }
        this.confirmDialogRef = null;
      });
  }

  rowClick(row) {
    if (this.options.customRowClick) {
      const event: RowClick = {
        eventType: EventType.ROW,
        item: row
      };
      this.dtClick.emit(event);
    } else {
      this.router.navigate(["../" + row.id], { relativeTo: this.activeRoute });
    }
  }

  addClick() {
    if (this.options.customAddClick) {
      const event: ClickEvent = {
        eventType: EventType.ADD
      };
      this.dtClick.emit(event);
    } else {
      this.router.navigate(["../new"], { relativeTo: this.activeRoute });
    }
  }

}


