import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit, OnDestroy {
  // Private
  _unsubscribeAll: Subject<any>;

  availableLanguage = ['lang1', 'lang2', 'lang3'];

  show: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddLanguageComponent>,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  form = this.fb.group({
    languages: this.fb.control(''),
    newLanguage: this.fb.control(''),
  });

  ngOnInit(): void {
  }

  addNewLanguage(): void {
  }

  showNewLangInput() {
    this.show = !this.show;
  }

  /* Close dialog */
  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
