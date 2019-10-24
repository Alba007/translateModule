import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-edit-key-language',
  templateUrl: './view-edit-key-language.component.html',
  styleUrls: ['./view-edit-key-language.component.scss']
})
export class ViewEditKeyLanguageComponent implements OnInit, OnChanges {

  // Data from selected row
  @Input() data: any;
  // Emitter to close the drawer
  @Output() closeButton = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.form = this.fb.group({
      language: this.fb.control(''),
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.data.currentValue);
    if (changes.data.currentValue) {
      this.editLanguage();
    }
  }

  editLanguage() {
    this.form.patchValue({
      language: this.data.language,
      key: this.data.key,
      value: this.data.value,
    });
  }

  close() {
    this.closeButton.emit(true);
  }

}
