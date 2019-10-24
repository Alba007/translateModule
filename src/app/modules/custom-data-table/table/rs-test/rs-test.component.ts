import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { MatCheckboxChange, MatAutocompleteTrigger, MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete, MatPaginator } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

class SearchFilter {
  type = 'filter';
  pageIndex: number;
  pageSize: number;
  pageLength: number;
  filters: any[];
}

@Component({
  selector: 'app-rs-test',
  templateUrl: './rs-test.component.html',
  styleUrls: ['./rs-test.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RsTestComponent implements OnInit, AfterViewInit {
  // Private
  private _unsubscribeAll: Subject<any>;

  // options: DataTableOptions = {
  //   title: 'Roles',
  //   dynamicColumns: ['name', 'type'],
  //   secondaryDynamicColumns: [],
  //   actions: ['actions'],
  //   showActions: true,
  //   rowActions: [{ icon: 'refresh', name: 'TEST' }],
  //   tableActions: [{ icon: 'refresh', name: 'TEST' }],
  //   select: ['select'],
  //   showSelect: true,
  //   extraDetail: ['expandedDetail'],
  //   showExtraDetail: false,
  //   showSearchFilter: true,
  //   searchFilters: [
  //     { type: 'date', name: 'date' },
  //     { name: 'one' },
  //     { type: 'date', name: 'two' },
  //     { type: null, name: 'three' }
  //   ],
  //   paginatorOptions: {
  //     pageIndex: 2,
  //     pageSize: 5,
  //     pageSizeOptions: [1, 5, 10, 25, 200],
  //   },
  //   datasource: [],
  // searchFilters: ['date', 'one', 'two', 'three', 'four', 'five']

  // };
  options = {
    showSearchFilter: true,
    searchFilters: [
      { type: 'date', name: 'date' },
      { name: 'one' },
      { type: 'date', name: 'two' },
      { type: null, name: 'three' }
    ],
    showActions: true,
    actions: [
      { icon: 'add', name: 'add' },
      { icon: 'delete', name: 'delete' },
    ],
    showMultiple_actions: true,
    multiple_actions: [
      { icon: 'add', name: 'add' },
      { icon: 'delete', name: 'delete' },
      { icon: 'create', name: 'edit' }
    ],
    field_actions: {
      show: true,
      first_action: { tooltip: 'on', color: 'green' },
      second_action: { tooltip: 'off', color: 'green' }
    },
    badgeConfiguration: {
      show: true,
      colorConfig: {
        WARN: 'red',
        ENNABLE: '#008000',
        // row2_info3_path: 'black'
      }
    },
    // ribbonConfiguration: {},
    checkBoxes: true,
    paginatorOptions: {
      page: 0,
      size: 10,
      pageSizeOptions: [1, 5, 10, 25, 100]
    },
    mappings: {
      // ROW 1
      icon: 'ikon',
      title_path: 'titull',
      row1_info1: {
        label: 'label11',
        attribute_path: 'r11',
      },
      row1_info2: {
        label: '12label',
        attribute_path: 'r12',
      },
      // row2_info1: {
      //   label: '21label',
      //   attribute_path: 'r21.a.b',
      // },
      // row2_info2: {
      //   label: '22label',
      //   attribute_path: 'r22',
      // },
      // row2_info3: {
      //   label: '23label',
      //   attribute_path: 'r23'
      // },
      rowDynamic: [
        // ROW 2

        {
          row2_info1: {
            label: '21label',
            attribute_path: 'r21.a.b',
          },
          row2_info2: {
            label: '22label',
            attribute_path: 'r22',
          },
          row2_info3: {
            label: '23label',
            attribute_path: 'r23'
          }
        },
        // ROW 3

        {
          row2_info1: {
            label: '31label',
            attribute_path: 'r31.a.b',
          },
          row2_info2: {
            label: '32label',
            attribute_path: 'r32',
          },
          row2_info3: {
            label: '33label',
            attribute_path: 'r33'
          }
        }
      ]
    },
    data: [
      {
        ikon: 'add',
        titull: 'TEST!',
        r11: 'row1_info1_path111111',
        r12: '2018-11-05T16:40:17.000Z',

        r21: { a: { b: 'rigers' } },
        r22: 'row2_info2_path',
        r23: 'WARN',

        r31: { a: { b: 'saliu' } },
        r32: 'row3_info2_path',
        r33: 'row3'
      },
      {
        ikon: 'insert_emoticon',
        titull: 'TEST!',
        r11: 'row1_info1_path111111',
        r12: '2018-11-05T16:40:17.000Z',

        r21: { a: { b: 'saliuu' } },
        r22: 'row2_info2_path',
        r23: 'Test',

        r31: { a: { b: 'test' } },
        r32: 'row3_info2_path',
        r33: 'row3'
      },
      // test
      { icon: 'insert_emoticon', title_path: 'FAN2', row1_info1: { attribute_path: 'rs ss2' }, row1_info2: 'test2' },

      {
        icon: 'add',
        title_path: 'FANTest',
        row1_info111222222222: 'row1_info1_path111111',
        row1_info2: 'row1_info2_path',

        row2_info1: 'row2_info1_path',
        row2_info2: 'row2_info2_path',
        row2_info3: 'row2_info3_path'
      },
      {
        icon: 'add',
        title_path: 'FANTest',
        row1_info111222222222: 'row1_info1_path111111',
        row1_info2: 'row1_info2_path',

        row2_info1: 'row2_info1_path',
        row2_info2: 'row2_info2_path',
        row2_info3: 'ENNABLE'
      },
      {
        icon: '',
        title_path: 'FANTest',
        row1_info111222222222: 'row1_info1_path111111',
        row1_info2: 'row1_info2_path',

        row2_info1: 'row2_info1_path',
        row2_info2: 'row2_info2_path',
        row2_info3: 'WARN'
      },


      {
        ikona: 'add',
        titulli: 'test',
        firstName: "sgsd",
        email: "aaa",
        username: "sdbsd",
        lastName: "dgsd",
        systemRole: "APPLICATION",
        active: true
      }

    ]
  };
  // @Input() options: any;

  // @Input() data: any[];

  // @Input() selectableRow: boolean = false;

  // @Input() checkBoxes: boolean = true;

  // @Input() showSearch: boolean = true;

  // @Input() showPagination: boolean = true;

  // @Output() queryEmiter = new EventEmitter();

  // @Output() actionsEmiter = new EventEmitter();

  // @Output() multipleActionsEmiter = new EventEmitter();

  // @Output() selectableRowEmiter = new EventEmitter();

  // @Output() fieldActionEmiter = new EventEmitter();

  // protected selectedRow: any;

  protected flexData = {
    search: {
      default: 90,
      md: 82,
      sm: 75,
      xs: 70
    },
    rowContent: {
      default: 96,
      sm: 94,
      xs: 92
    }
  };

  @Output() messageEvent = new EventEmitter<any>();

  constructor() {
    // this.filteredfilters = this.filterCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((filter: string | null) => filter ? this._filter(filter) : this.allFilters.slice()));
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.handlePageChanges({
      pageIndex: this.options.paginatorOptions.page,
      pageSize: this.options.paginatorOptions.size
    });
    // this.selectableRow == null ? this.selectableRow = false : null;
    // this.checkBoxes == null ? this.checkBoxes = true : null;
    // this.options.data != null ? this.options.data.forEach(element => element.data_table_checked = false) : {};
    // this.autocompleteTrigger != null ? this.autocompleteTrigger.autocompleteDisabled = true : null;

    // //change flex layout
    if (this.options.checkBoxes == false) {
      this.flexData.search.default = 100;
      this.flexData.search.md = 100;
      this.flexData.search.sm = 100;
      this.flexData.search.xs = 100;

      this.flexData.rowContent.default = 100;
      this.flexData.rowContent.sm = 100;
      this.flexData.rowContent.xs = 100;
    }

    //populate filters list
    // this.options.filter_options.forEach(filter => this.allFilters.push(filter.key));


  }


  // isDate(date: any) {
  //   console.log('sssss');

  //   let formats = [
  //     moment.ISO_8601,
  //     "MM/DD/YYYY    HH*mm*ss"
  //   ];
  //   return moment(date, formats, true).isValid();
  // }

  handleFieldAction(item: any) {
    item.field_action = !item.field_action;

    let action = {
      type: item.field_action,
      row: item
    };
    console.log(action);
    this.messageEvent.emit(action)
  }

  handleFiredAction(type?: any, row?: any) {
    console.log(type, ':', row);

    this.messageEvent.emit({ type: type, row: row })
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    console.error('chaaaaaa', changes);

    // if (changes['data']) {
    //   this.data != null ? this.data.forEach(element => element.data_table_checked = false) : {};
    // }
  }


  // getValue(object: Object, path: string) {
  //   let attrArray = path.split('.');
  //   let result: any = object;
  //   attrArray.forEach(attr => {
  //     result = result[attr];
  //   });
  //   return (result != '') ? result : null;
  // }

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  data: any[]
  handlePageChanges(paginatorObject) {
    // {previousPageIndex: 0, pageIndex: 1, pageSize: 4, length: 5}
    console.log(paginatorObject);
    let index = 0,
      startingIndex = paginatorObject.pageIndex * paginatorObject.pageSize,
      endingIndex = startingIndex + paginatorObject.pageSize;

    this.data = this.options.data.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    // this.options.query_options.page = changes.pageIndex + 1;
    // this.options.query_options.size = changes.pageSize;
    // this.queryEmiter.emit(this.options);
  }

  // handleFiredAction(actionName, object) {
  //   let action = {
  //     name: actionName,
  //     target: object
  //   }
  //   this.actionsEmiter.emit(action);
  // }

  // handleFiredMultipleAction(actionName) {
  //   if (this.allItemsChecked) {
  //     let multipleAction = {
  //       name: actionName,
  //       target: 'ALL',
  //       filters: this.options.query_options.filters
  //     };
  //     this.multipleActionsEmiter.emit(multipleAction)
  //   } else {
  //     let objList: any[] = [];
  //     this.data.forEach(element => {
  //       element.data_table_checked ? objList.push(element) : {};
  //     })
  //     if (objList.length > 0) {
  //       let multipleAction = {
  //         name: actionName,
  //         target: objList
  //       };
  //       this.multipleActionsEmiter.emit(multipleAction)
  //     }
  //   }
  // }

  handleSelectedRow(row) {
    console.log('row select', row);
    this.messageEvent.emit({ type: 'row_select', row: row })

    //   if (this.selectableRow) {
    //     this.selectedRow = item;
    //     this.selectableRowEmiter.emit(this.selectedRow);
    //   }
  }


  /*
  *======================== Checkboxes =========================
  */
  private allItemsChecked: boolean = false;

  checkAllItems(event: MatCheckboxChange) {
    if (event.checked) {
      this.allItemsChecked = true;
      this.options.data.forEach((element: any) => {
        element.data_table_checked = true
        console.log('rsssss', element);

      });
    } else {
      this.allItemsChecked = false;
      this.options.data.forEach((element: any) => element.data_table_checked = false);
    }
  }

  handleCheck(item) {
    console.log(item);

    item.data_table_checked = !item.data_table_checked;
  }

  /*======================== Checkboxes =========================*/

  // //========================== Search ==========================//

  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // filterCtrl = new FormControl();
  // filteredfilters: Observable<string[]>;
  // allFilters: string[] = [];

  // @ViewChild('finterInput') finterInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;
  // @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  // add(event: MatChipInputEvent): void {
  //   // Add filter only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;

  //     // Add our filter
  //     if ((value || '').trim()) {

  //       if (this.options.query_options.filters.length > 0 && this.options.query_options.filters[this.options.query_options.filters.length - 1].value == null) {
  //         this.options.query_options.filters[this.options.query_options.filters.length - 1].value = value
  //         this.fireSearch();
  //       }
  //       // this.options.query_options.filters.push({
  //       //   key: value.trim(),
  //       //   value: null
  //       // });
  //     }

  //     // Reset the input value
  //     if (input) {
  //       input.value = '';
  //     }

  //     this.filterCtrl.setValue(null);
  //   }
  // }

  // remove(toRemove: any): void {
  //   let i: any = -1;
  //   for (let index in this.options.query_options.filters) {
  //     if (this.options.query_options.filters[index].key == toRemove.key && this.options.query_options.filters[index].value == toRemove.value) {
  //       i = index;
  //     }
  //   }
  //   if (i >= 0) {
  //     this.options.query_options.filters.splice(i, 1);
  //   }
  //   this.allFilters.push(toRemove.key);
  //   this.fireSearch();
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   let newFilter = {
  //     attribute: this.getFilterAttributeFromKey(event.option.viewValue),
  //     key: event.option.viewValue,
  //     value: null
  //   }
  //   this.options.query_options.filters.push(newFilter);

  //   this.removeFromAllFilters(newFilter);

  //   this.finterInput.nativeElement.value = '';
  //   this.filterCtrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFilters.filter(filter => filter.toLowerCase().indexOf(filterValue) === 0);
  // }

  // public handleShowAutocomplete() {
  //   if (this.options.query_options.filters.length == 0 || this.options.query_options.filters[this.options.query_options.filters.length - 1].value != null) {
  //     this.autocompleteTrigger.autocompleteDisabled = false;
  //     this.autocompleteTrigger.openPanel();
  //   } else {
  //     this.autocompleteTrigger.autocompleteDisabled = true;
  //     this.autocompleteTrigger.closePanel();
  //   }
  //   // console.log(this.autocompleteTrigger.autocompleteDisabled);
  // }

  // private removeFromAllFilters(filter) {
  //   this.allFilters.splice(this.allFilters.indexOf(filter.key), 1)
  // }

  // getFilterAttributeFromKey(key): string {
  //   for (const i in this.options.filter_options) {
  //     if (this.options.filter_options[i].key == key) return this.options.filter_options[i].attribute;
  //   }
  // }

  // fireSearch() {
  //   this.queryEmiter.emit(this.options);
  // }

  // //========================== Search ==========================//

  // //========================== Ribbon ==========================//
  // // getItemRibbonColor(item): string {
  // //   if (this.options.ribbonConfiguration == null) return 'green';
  // //   let color: string = this.options.ribbonConfiguration.default;
  // //   this.options.ribbonConfiguration.checks.forEach(check => {
  // //     if (this.getValue(item, check.attr_path) == check.value) {
  // //       color = check.result;
  // //     }
  // //   });
  // //   return color;
  // // }

  // getItemRibbonMessage(item): string {
  //   if (this.options.ribbonConfiguration == null) return null;
  //   let message: string;
  //   this.options.ribbonConfiguration.checks.forEach(check => {
  //     if (this.getValue(item, check.attr_path) == check.value) {
  //       if (check.message_path != null) {
  //         message = this.getValue(item, check.message_path)
  //       } else {
  //         message = check.message;
  //       }
  //     }
  //   });
  //   return (message != '') ? message : null;
  // }
  //   getClass(item): string {
  //     if (this.getValue(item, this.options.badgeConfiguration.badge_path).toString() == this.options.badgeConfiguration.defaultValue) {
  //         return "badge-class-green";
  //     } else {
  //         return "badge-class-gray";
  //     }
  // }
  getBadgeStyle(item): any {
    /**Default Color */
    let color = '#a9a9a961';
    /**Check if another color is assigent to that value at badge config */
    if (this.options.badgeConfiguration.colorConfig[item]) {
      color = this.options.badgeConfiguration.colorConfig[item];
    }
    /**Badge style */
    let style: any = {
      'border': 'solid ' + '2px ' + color,
      'border-radius': 20 + 'px',
      'padding-left': 6 + 'px',
      'padding-right': 6 + 'px',
      'font-size': 13 + 'px',
    };

    return style;
  }

  // //========================== Ribbon ==========================//
  // handleFieldAction(actionName, target) {
  //   let action: any = {
  //     name: actionName,
  //     target: target
  //   }
  //   this.fieldActionEmiter.emit(action);
  // }

  getIconStyle(fieldAction: any) {

    let style: any = {};

    if (fieldAction) {
      style.color = this.options.field_actions.first_action.color;
    }

    return style;
  }

  searchFilterObject: SearchFilter = new SearchFilter();

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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

}
