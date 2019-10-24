import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-data-list',
  templateUrl: './test-data-list.component.html',
  styleUrls: ['./test-data-list.component.scss']
})
export class TestDataListComponent implements OnInit {

  // @ViewChild(DataListComponent) dataList: DataListComponent;

  title = "Test";

  datasource = [
    // { name: { test: 'rigers' }, surname: 'saliu' },
    { name: 'rigers', surname: 'saliu', icon: 'person' },
    { name: 'brigen', surname: 'tafilica', icon: 'add' },
    { name: 'skerdjan', surname: 'gurabardhi', icon: 'add' }
  ];

  checkBox = true;

  actions = [
    { icon: 'add', name: 'add' },
    { icon: 'delete', name: 'delete' },
  ];
  multiple_actions = [
    { icon: 'add', name: 'add' },
    { icon: 'delete', name: 'delete' },
    { icon: 'create', name: 'edit' }
  ];


  showPaginator = true;
  paginatorOptions = {
    page: 0,
    size: 10,
    pageSizeOptions: [1, 5, 10, 25, 100]
  };

  showSearch = true;
  searchFilters = [
    { type: 'date', name: 'date' },
    { name: 'one' },
    { type: 'date', name: 'two' },
    { type: null, name: 'three' }
  ];

  sortDirection = false;

  constructor() { }

  ngOnInit() {
  }

  receiveMessage(event) {
    console.log(event);

    switch (event.type) {

      case 'filter': {
        console.log('aaa');
        
        // this.apiService.getData(event).subscribe((data) => {
        //   // console.log(data);
        //   this.datasource = data;
        // });
        break;
      }
      
    }
  }
}
