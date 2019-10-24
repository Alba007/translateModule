import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit, AfterViewInit {

  @Output() messageEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  _unsubscribeAll: Subject<any>;
  
  searchFilterObject: Filter = {
    type : 'filter'
  };

  constructor() { 
    this._unsubscribeAll = new Subject();
  }

  @Input() template;
  @Input() dataContext;
  @Input() title;
  @Input() checkBox: boolean;
  @Input() showPaginator: boolean;
  @Input() paginatorOptions;
  @Input() showSearch: boolean;
  @Input() searchFilters;
  @Input() multiple_actions;
  @Input() sortDirection;
  
  ngOnInit() {
    // console.log(this.dataContext);

    this.handlePageChanges({
      pageIndex: this.paginatorOptions.page,
      pageSize: this.paginatorOptions.size
    });
  }


  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.

    /**Get emited values from mat paginator */
    this.paginator.page
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: MatPaginator) => {
        // console.log('Paginator', data);
        this.searchFilterObject.pageIndex = data.pageIndex;
        this.searchFilterObject.pageSize = data.pageSize;
        this.searchFilterObject.pageLength = data.length;
        // console.log('Pag RS ', this.searchFilterObject);
        this.messageEvent.emit(this.searchFilterObject);
      });
  }

  handleSelectedRow(item) {
    console.log('punon', item);
  }

  itemClick = (item) => {
    this.handleSelectedRow(item);
  }

  handleFiredAction = (type?: any, row?: any) => {
    // console.log(type, ':', row);

    this.messageEvent.emit({ type: type, row: row });
  }

  handleFiredActionForAll(event) {
    // console.log(event);
    
    this.messageEvent.emit({ type: event});
  }

  data: any[];
  private handlePageChanges(paginatorObject): any {
    let index = 0,
      startingIndex = paginatorObject.pageIndex * paginatorObject.pageSize,
      endingIndex = startingIndex + paginatorObject.pageSize;

    this.data = this.dataContext.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }
 
  private handleCheck(item) {
    // console.log(item);
 
    item.data_table_checked = !item.data_table_checked;
  }
  
  private search(event): any {
    console.log(event);
    this.searchFilterObject.filters = event;
    this.messageEvent.emit(this.searchFilterObject);
  }

  private sort(event) {
    // console.log(event);
    this.searchFilterObject.sortDirection = event.sortDirection;
    this.searchFilterObject.sortBy = event.sortBy;

    this.messageEvent.emit(this.searchFilterObject);

  }
}
