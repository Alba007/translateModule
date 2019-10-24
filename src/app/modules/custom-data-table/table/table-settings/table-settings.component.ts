import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss']
})
export class TableSettingsComponent implements OnInit, AfterViewInit {

  @Input() data: any;

  form: FormGroup;

  @Output() newTableColumnsEvent = new EventEmitter<object>()
  /** Close drower event */
  @Output() hideSettings = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log('data nga parenti', this.data)

    this.intiForm();

    this.form.patchValue({
      select: this.data.showSelect,
      actions: this.data.showActions,
      secondRow: this.data.showSecondaryDynamicColumns,
      detailsRow: this.data.showExtraDetail,
      searchFilter: this.data.showSearchFilter
      // showColumn: true
    });

    this.data.dynamicColumns.forEach(element => {
      let index = this.data.dynamicColumns.indexOf(element)
      this.addTableColumn(element, index);
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.form.get('secondRow').valid);
  }

  intiForm() {
    this.form = this.fb.group({
      select: this.fb.control(true),
      actions: this.fb.control(true),
      secondRow: this.fb.control({ value: true, disabled: (this.data.secondaryDynamicColumns.length == 0) }),
      detailsRow: this.fb.control({ value: true, disabled: (this.data.extraDetail.length == 0) }),
      searchFilter: this.fb.control(true),
      tableColumns: this.fb.array([])
    });
  }
  closeDrawer() {
    this.hideSettings.emit(true);
  }
  sendSettingsEvent() {
    this.newTableColumnsEvent.emit(this.form.value.tableColumns);
  }
  /*
   *  Columns FORM
   */
  // getter that retrive the device from the form
  get tableColumnForms() {
    // return them as a form array
    return this.form.get('tableColumns') as FormArray;
  }

  addTableColumn(element: string, index: number) {

    const column = this.fb.group({
      name: element,
      position: index + 1,
      showColum: true
    });

    this.tableColumnForms.push(column);
  }

  deleteTableColumn(i) {
    this.tableColumnForms.removeAt(i);
    this.save();
  }

  deleteAllTableColumns() {
    while (this.tableColumnForms.length !== 0) {
      this.tableColumnForms.removeAt(0);
    }
  }

  save() {
    setTimeout(() => {
      this.sendSettingsEvent()

    }, 100)
  }
}
