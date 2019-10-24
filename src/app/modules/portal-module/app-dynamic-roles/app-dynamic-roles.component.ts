import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-app-dynamic-roles',
  templateUrl: './app-dynamic-roles.component.html',
  styleUrls: ['./app-dynamic-roles.component.scss']
})
export class AppDynamicRolesComponent implements OnInit {

  form = this.fb.group({
    roles: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
  ) { }
  
  ngOnInit() {
    this.addTableColumn();
  }

  /*
   *  Columns FORM
   */
  // getter that retrive the device from the form
  get tableColumnForms() {
    // return them as a form array
    return this.form.get('roles') as FormArray;
  }

  addTableColumn() {

    const column = this.fb.group({
      name: '',
      select: true
      
    });

    this.tableColumnForms.push(column);
  }

  deleteTableColumn(i) {
    this.tableColumnForms.removeAt(i);
  }

  deleteAllTableColumns() {
    while (this.tableColumnForms.length !== 0) {
      this.tableColumnForms.removeAt(0);
    }
  }
}
