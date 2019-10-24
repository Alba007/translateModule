import { Component, OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, Input, ViewChild, Output, EventEmitter, NgZone, ChangeDetectorRef, ApplicationRef, SimpleChanges, OnDestroy } from '@angular/core';
import { DataTableOptions, PaginatorOptions } from '../models/data-table-options';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableSettingsComponent } from './table-settings/table-settings.component';
import * as XLSX from 'xlsx';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var jsPDF: any;

class SearchFilter {
  type = 'filter';
  pageIndex: number;
  pageSize: number;
  pageLength: number;
  filters: any[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // animations: fuseAnimations,
  animations: [fuseAnimations,
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, OnDestroy {
  // Private
  private _unsubscribeAll: Subject<any>;


  manualPage: number;
  maxManualPage: number;

  @Input()
  options: DataTableOptions;

  title: string;
  expandedElement: any | null;
  tableColumns: any;
  dynamicColumns: string[] = [];
  secondaryDynamicColumns: string[] = [];
  actions: string[] = [];
  select: string[] = [];
  extraDetail: string[] = [];
  showSearchFilter: boolean;
  searchFilterObject: SearchFilter = new SearchFilter();
  paginatorOptions: PaginatorOptions;
  // dynamicColumns: string[] = ['id', 'role', 'username', 'status',];
  // secondaryDynamicColumns: string[] = ['firstname', 'lastname', 'email'];
  // actions: string[] = ['actions'];
  // select: string[] = ['select'];
  // extraDetail: string[] = ['expandedDetail'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(TableSettingsComponent) tableSetting: TableSettingsComponent;

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    public zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    // private datatableService: DatatableService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    document.cookie = "dev.to=awesome";
  }

  ngOnInit() {
    console.log(document.cookie);

    /* Testing Purpose */
    // this.dataSource.data = ELEMENT_DATA
    // console.log(this.options.searchFilters);

    // console.log(this.searchFilterObject);

    this.dataTableInit();

    this.tableColumns = this.select.concat(this.dynamicColumns.concat(this.actions));

    if (this.options.showSearchFilter) {
      this.showSearchFilter = true;
    } else {
      this.showSearchFilter = false;
    }

    if (this.options.showSelect) {
      this.addStaticColumn('select');

    } else {
      this.removeStaticColumn('select');
    }
    if (this.options.showActions) {
      this.addStaticColumn('actions');

    } else {
      this.removeStaticColumn('actions');
    }

    if (this.options.showSecondaryDynamicColumns) {
      this.showRow('secondRow');

    } else {
      this.hideRow('secondRow');
    }

    if (this.options.showExtraDetail) {
      this.showRow('detailsRow');

    } else {
      this.hideRow('detailsRow');
    }
    // this.dataSource.paginator = this.paginator;

    // setInterval(()=>{
    //   this.dataSource.data = this.options.datasource;
    // },1000)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    // console.log('r',changes.options.currentValue);
    // console.log('s',changes.options.currentValue.datasource);

    setTimeout(() => {
      // this.options = changes.options.currentValue
      this.dataSource.data = changes.options.currentValue.datasource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.dataTableInit();
    }, 100)


    // console.log(changes.options)
    // this.secondaryDynamicColumns = changes.options.currentValue.secondaryDynamicColumns
    // this.dataTableInit();

  }
  ngDoCheck() {
    // this.dataTableInit();
  }

  ngAfterViewInit() {
    // this.dataTableInit();
    this.tableSetting.form.valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      console.log('forma ndryshoi', data);

      if (data.select) {
        this.addStaticColumn('select');

      } else {
        this.removeStaticColumn('select');
      }

      if (data.actions) {
        this.addStaticColumn('actions');

      } else {
        this.removeStaticColumn('actions');
      }

      if (data.secondRow) {
        this.showRow('secondRow');
      } else {
        this.hideRow('secondRow');
      }

      if (data.detailsRow) {
        this.showRow('detailsRow');
      } else {
        this.hideRow('detailsRow');
      }

      this.showSearchFilter = data.searchFilter;
    });

    /**Get emited values from mat paginator */
    this.paginator.page.subscribe((data: MatPaginator) => {
      // console.log('Paginator', data);
      this.searchFilterObject.pageIndex = data.pageIndex;
      this.searchFilterObject.pageSize = data.pageSize;
      this.searchFilterObject.pageLength = data.length;
      // console.log('Pag RS ', this.searchFilterObject);
      this.messageEvent.emit(this.searchFilterObject);
    });
  }

  ngAfterViewChecked() {
    // this.dataTableInit()    
  }

  ngAfterContentInit() {
    // this.dataTableInit();
  }

  ngAfterContentChecked() {
    // this.dataTableInit();  
  }

  /**
    * On destroy
    */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // isArray(obj: any) {
  //   console.log('aa');

  //   return Array.isArray(obj);
  // }

  isObject(obj: any) {
    console.log(obj);

    return typeof obj === 'object' && obj !== null;
  }

  //   isDate(date: any) {
  // console.log(date);

  //     let formats = [
  //       moment.ISO_8601,
  //       "MM/DD/YYYY    HH*mm*ss"
  //     ];
  //     return moment(date, formats, true).isValid();
  //   }

  sendMessage(row?, type?: any) {
    this.messageEvent.emit({ type: type, row: row })
  }

  /** Reciving new columns from child component */
  reciveNewColumns(newColums) {
    console.log('saliu', newColums);
    // for(let element of newColums) {
    //   if(element.showColum == true){
    //     console.log('rs', element.name, element.position);

    //     this.addDynamicColumn(element.name, element.position)
    //   } else if(element.showColum == false) {
    //     console.log('sr', element);

    //     this.removeDynamicColumn(element.name);
    //   }
    // }

    let newColsNames = [];
    newColums.forEach(element => {
      if (element.showColum) {

        this.addDynamicColumn(element.name, element.position)
      } else {

        this.removeDynamicColumn(element.name);
      }
      newColsNames.push(element.name);
      // this.addDynamicColumn(element.name, element.position)

    });

    /** Remove the colum  */
    this.dynamicColumns.forEach(element => {

      if (!newColsNames.includes(element)) {

        this.removeDynamicColumn(element);
      }
    });
  }

  showRow(row) {
    switch (row) {
      case 'secondRow':
        this.secondaryDynamicColumns = this.options.secondaryDynamicColumns;
        this.options.showSecondaryDynamicColumns = true;
        break;

      case 'detailsRow':
        this.extraDetail = this.options.extraDetail;
        this.options.showExtraDetail = true;
        break;

      default:
        break;
    }
    setTimeout(() => {
      // this.dataTableInit()
      this.dataSource.data = this.options.datasource;
    }, 100);

  }

  hideRow(row) {

    switch (row) {
      case 'secondRow':
        this.secondaryDynamicColumns = [];
        this.options.showSecondaryDynamicColumns = false;
        break;

      case 'detailsRow':
        this.extraDetail = []
        this.options.showExtraDetail = false;
        break;

      default:
        break;
    }

    // this.extraDetail.shift()
    setTimeout(() => {
      // this.dataTableInit()
      this.dataSource.data = this.options.datasource;
    }, 100);

  }

  addStaticColumn(column) {

    if (!this.tableColumns.includes(column)) {
      /** Add actions in the end of array */
      if (column === 'actions') {
        this.tableColumns.push(column)
        /** Update option object & saving state*/
        this.options.actions.push(column);
        this.options.showActions = true;

      } else {
        /** Add select in the start of array */
        this.tableColumns.splice(0, 0, column);
        /** Update option object & saving state*/
        this.options.select.push(column);
        this.options.showSelect = true;

      }

      /*Save state in the service */
      // this.datatableService.selectOptions(this.options);

    }
  }

  removeStaticColumn(column) {
    let index = this.tableColumns.indexOf(column);

    if (index != -1) {
      this.tableColumns.splice(index, 1);
    }

    /** Update option object & saving state*/
    switch (column) {
      case 'select':
        this.options.select = []
        this.options.showSelect = false;
        break;

      case 'actions':
        this.options.actions = []
        this.options.showActions = false;
        break;

      default:
        break;
    }

    /*Save state in the service */
    // this.datatableService.selectOptions(this.options);
  }

  addDynamicColumn(column, index?) {
    /** If column isn't present add into array at a specific index */
    if (!this.tableColumns.includes(column)) {

      /** This check is made to handle case when the position is not entered */
      if (index) {
        this.dynamicColumns.splice(index - 1, 0, column)
      } else {
        this.dynamicColumns.push(column)
      }

      this.tableColumns.splice(index ? index : -1, 0, column)

      // this.datatableService.selectOptions(this.options);
    }

  }

  removeDynamicColumn(column) {
    let index = this.tableColumns.indexOf(column);
    let index2 = this.dynamicColumns.indexOf(column);

    /** Remove column off array at a specific index */
    if (index != -1) {
      this.tableColumns.splice(index, 1);
      this.dynamicColumns.splice(index2, 1);

      // this.datatableService.selectOptions(this.options);

    }
  }

  dataTableInit() {

    // this.dataSource.data = []
    this.title = this.options.title;
    if (this.options.datasource) {
      this.dataSource.data = this.options.datasource;
    }

    if (this.options.dynamicColumns) {
      this.dynamicColumns = this.options.dynamicColumns;
    }
    if (this.options.secondaryDynamicColumns) {
      this.secondaryDynamicColumns = this.options.secondaryDynamicColumns;
    }
    if (this.options.actions) {
      this.actions = this.options.actions;
    }
    if (this.options.select) {
      this.select = this.options.select;
    }

    if (this.options.extraDetail) {
      this.extraDetail = this.options.extraDetail;
    }

    if (this.options.paginatorOptions) {
      this.paginatorOptions = this.options.paginatorOptions;
      this.manualPage = this.options.paginatorOptions.pageIndex;
    }

  }

  highlight(row) {
    row.selected = !row.selected;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.selection.selected.forEach(row => {
      this.highlight(row)
    })
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
        this.highlight(row)
      });
  }

  /** Drag and Drop Columns of the table */
  previousIndex: number;

  dragStarted(event: CdkDragStart, index: number) {
    // console.log(event);
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {

    if (event) {
      moveItemInArray(this.dynamicColumns, this.previousIndex, index);
      this.setDisplayedColumns();
      // console.log(this.dynamicColumns);

    }
  }

  setDisplayedColumns() {

    this.tableColumns = this.select.concat(this.dynamicColumns.concat(this.actions));

  }

  /** Export Data of the table */
  exportPDF() {

    let tempTitle = this.title;

    let doc = new jsPDF('l', 'pt');
    let columns: any[] = []
    this.dynamicColumns.forEach((element) => {

      columns.push({ header: element.toUpperCase(), dataKey: element })
    })

    let title = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text(tempTitle, data.settings.margin.left, 50);
    };
    doc.autoTable({
      // columnStyles: {europe: {halign: 'center'}}, // European countries centered
      // body: [
      //   { europe: 'Sweden', america: 'Canada', asia: 'China' },
      //   { europe: 'Norway', america: 'Mexico', asia: 'Japan' }
      // ],
      // columns: [
      //   { header: 'Europe', dataKey: 'europe' },
      //   { header: 'Asia', dataKey: 'asia' },
      //   { header: 'AMERICA', dataKey: 'america' }]
      margin: { top: 100 },

      body: this.dataSource.data,
      columns: columns,

      didDrawPage: title
    })
    doc.save('table.pdf');
  }

  exportExcel() {

    let shownData: any[] = []
    this.dataSource.data.map(res => {
      // console.log(res);

      let elmo = res
      const subset = this.dynamicColumns.reduce((a, e) => (a[e] = elmo[e], a), {});
      shownData.push(subset);

    })

    // console.log(shownData);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(shownData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'my_file.xls', { bookType: 'xls', type: 'buffer' });
  }

  updateManualPage(index) {
    // console.log(index);

    // Find the max number of pages
    this.maxManualPage = Math.ceil(this.paginator.length / this.paginator.pageSize);

    if (index < this.maxManualPage) {

      this.manualPage = index;
      this.paginator.pageIndex = index;

      this.paginator.page.next({
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    }

  }

  search(event) {
    console.log(event);
    this.searchFilterObject.filters = event;
    // console.log('Search RS ', this.searchFilterObject);
    this.messageEvent.emit(this.searchFilterObject);

    // let test = {
    //   pageIndex: this.paginator.pageIndex,
    //   size: this.paginator.pageSize,
    //   filters: event
    // }

    // console.log(test)

  }

  view = true;
  changeView() {
    this.view = !this.view;
  }
}
