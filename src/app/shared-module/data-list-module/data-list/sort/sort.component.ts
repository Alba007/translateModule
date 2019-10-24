import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum Color {
  RED = 4, GREEN = 2
}

class SortFilter {
  type = 'sort';
  sortDirection: string;
  sortBy: string;
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Input()
  sortList;

  @Input()
  sortDirection;

  @Output()
  sortEmmiter = new EventEmitter();

  sort: SortFilter = new SortFilter();

  constructor() { }

  ngOnInit() {
    // get the default sorDirection
    this.convert();
  }

  changeSortDirection(): void {
    this.sortDirection = !this.sortDirection;

    this.convert();

    this.sortEmmiter.emit(this.sort);
  }

  sortBy(sortBy): void {
    this.sort.sortBy = sortBy;
    this.sortEmmiter.emit(this.sort);
  }

  /*
    * Convert sort from boolean to string 'ascending' & 'descending'
  */

  private convert(): void {
    if (this.sortDirection) {
      this.sort.sortDirection = 'descending';
    } else {
      this.sort.sortDirection = 'ascending';
    }
  }
}
