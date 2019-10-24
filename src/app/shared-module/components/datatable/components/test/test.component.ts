import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DataTableOptions } from '../../models/dataTableOptions';
import { environment } from '../../../../../../environments/environment';
// import { environment } from 'environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {
  @ViewChild('customTemplate')
  template : TemplateRef<any>;
  
  options: DataTableOptions = {
    // path: `${environment.domain}/api/v1/companies/categories`,
    path: `http://localhost:8080/user/list?page=0&size=10`,
    icon: 'account_balance',
    selector: 'company',
    displayedColumnsData  : {
      // 'id':{},
      'username':{},
      'email':{},
      'firstName':{},
      'createdAt':{
        type: 'date'
      },
      'lastName': {},
      'action': {
        type: 'html',
        disableSort: true
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.options.displayedColumnsData.action.template = this.template;
  }

}
