import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOptions } from '../../../custom-data-table/models/data-table-options';
import { MatDrawer } from '@angular/material';
import { TransitService } from '../../services/transit.service';
import { DummyData } from '../../utils/dummy-data';

@Component({
  selector: 'app-transits',
  templateUrl: './transits.component.html',
  styleUrls: ['./transits.component.scss']
})
export class TransitsComponent implements OnInit {

  options: DataTableOptions = {
    title: 'Transits',
    dynamicColumns: ['plate', 'lane', 'vehicle_class', 'vehicle_speed', 'time', 'date'],
    secondaryDynamicColumns: [],
    actions: ['actions'],
    showActions: true,
    rowActions: [],
    tableActions: [],
    select: ['select'],
    showSelect: true,
    extraDetail: ['expandedDetail'],
    showExtraDetail: false,
    showSearchFilter: true,
    searchFilters: [
      { type: 'date', name: 'date' },
      { name: 'one' },
      { type: 'date', name: 'two' },
      { type: null, name: 'three' }
    ],
    paginatorOptions: {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: [1, 5, 10, 25, 200],
    },
    datasource: [
      {
        plate: 'AA 123 CC',
        lane: '001001',
        vehicle_class: 'car',
        vehicle_speed: '115',
        time: '2018-11-05T16:40:17.000Z'
      }
    ],
    // searchFilters: ['date', 'one', 'two', 'three', 'four', 'five']

  };

  rowData: any;

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private transitService: TransitService
  ) { }

  ngOnInit() {
    this.loadTransits();
  }

  /**Recive data from child component APP-TABLE */
  receiveMessage($event) {
    console.log($event);

    switch ($event.type) {
      case 'add': {
        // this.addRole();
        break;
      }
      case 'edit': {
        this.rowData = $event.row;
        /** Fixed the problem when mode is side (drawer goes over) */
        setTimeout(() => {
          this.drawer.open();

        }, 200);

        break;
      }
      case 'delete': {
        // this.deleteRole($event.row);
        break;
      }
      case 'filter': {
        // this.apiService.getData($event).subscribe((data) => {
        //   // console.log(data);
        //   this.options.datasource = data;
        // });
        break;
      }
      case 'view': {
        this.rowData = $event.row;

        /** Fixed the problem when mode is side (drawer goes over) */
        setTimeout(() => {
          this.drawer.open();
        }, 200);

        break;
      }
    }
  }

  loadTransits() {
    this.options.datasource = DummyData;
    // this.transitService.getTransits().subscribe((data) => {
    //   // console.log(data);

    //   this.options.datasource = data;
    //   /** Should do to update the options properties */
    //   this.options = { ...this.options };

    // });
  }

  deleteTransit(transit) {

    // this.transitService.deleteRole(transit.id)
    //   .subscribe(
    //     () => {
    //       console.log('Role Deleted !');
    //       this.loadTransits();

    //     },
    //     console.error
    //   );
  }

}
