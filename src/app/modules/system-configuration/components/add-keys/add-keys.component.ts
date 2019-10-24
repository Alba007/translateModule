import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-keys',
  templateUrl: './add-keys.component.html',
  styleUrls: ['./add-keys.component.scss']
})
export class AddKeysComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddKeysComponent>,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    languages: this.fb.control(''),
    newLanguage: this.fb.control(''),
    keyValue: this.fb.array([])
  });

  ngOnInit() {
    this.addNewKeyValue();
  }

  /* Close dialog */
  close(): void {
    this.dialogRef.close();
  }

  /*
  *  Key FORM
  */
  // getter that retrive the filed from the form
  get keyValueForms() {
    // return them as a form array
    return this.form.get('keyValue') as FormArray;
  }

  addNewKeyValue() {

    const keyValue = this.fb.group({
      key: [''],
      value: [''],
    });

    this.keyValueForms.push(keyValue);
  }

  deleteKeyValue(i) {
    this.keyValueForms.removeAt(i);
  }

  deleteAllKeyValues() {
    while (this.keyValueForms.length !== 0) {
      this.keyValueForms.removeAt(0);
    }
  }

}
