import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataTableOptions } from '../models/data-table-options';

const ELEMENT_DATA: any[] = [
  {
    id: '1',
    role: ['Admin', 'Admin2'],
    username: 'administrator',
    status: 'active',
    firstname: 'rigers',
    lastname: 'saliu',
    email: 'test@gmail.com',
    test: 'llllll',
    test2: 'rs',
    'start Date': '2018-03-31T16:40:17.000Z',
    endDate: '2018-11-05T16:40:17.000Z',
    ribbon: 'green'
  },
  {
    id: '2', role: 'Admin2', username: 'administrator2', status: 'active', firstname: 'test2', lastname: 'test2', email: 'test2@gmail.com', ribbon: 'red'
  },
  {
    id: '3', role: 'Admin3', username: 'administrator3', status: 'active', firstname: 'test3', lastname: 'test3', email: 'test3@gmail.com', ribbon: 'yellow'
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com', ribbon: 'grey'
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com',
  },
  {
    id: '4', role: 'Admin4', username: 'administrator4', status: 'active', firstname: 'test4', lastname: 'test4', email: 'test4@gmail.com',
  }
]
@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private options: DataTableOptions = {
    title: 'Test',
    dynamicColumns: ['id', 'role', 'username', 'status', 'start Date', 'endDate'],
    secondaryDynamicColumns: ['start', 'firstname', 'lastname', 'email', 'five', 'six', 'seven', 'end'],
    showSecondaryDynamicColumns: true,
    actions: ['actions'],
    showActions: true,
    rowActions: [{ icon: 'refresh', name: 'TEST' }],
    tableActions: [{ icon: 'refresh', name: 'TEST' }],
    select: ['select'],
    showSelect: true,
    extraDetail: ['expandedDetail'],
    showExtraDetail: true,
    showSearchFilter: true,
    // searchFilters: ['date', 'one', 'two', 'test'],
    searchFilters: [
      { type: 'date', name: 'date Test' },
      { type: null, name: 'one' },
      { type: null, name: 'two' },
      { type: null, name: 'test' }
    ],
    paginatorOptions: {
      pageIndex: 0,
      pageSize: 4,
      pageSizeOptions: [1, 5, 10, 25, 100],
    },
    datasource: ELEMENT_DATA,
  }

  private selectedOptions = new BehaviorSubject<DataTableOptions>(this.options);
  currentSelectedOptions = this.selectedOptions.asObservable();

  constructor() { }

  // selectOptions(road) {
  //   this.selectedOptions.next(road);
  // }

}
