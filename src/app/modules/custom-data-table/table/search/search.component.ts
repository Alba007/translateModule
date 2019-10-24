import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, DoCheck, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  // Private
  private _unsubscribeAll: Subject<any>;

  @Input()
  filter: any;

  @Output()
  filterEmiter = new EventEmitter<any>();


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filterControl = new FormControl();
  filters: any[] = [];
  // allFilters: any[] = ['date', 'one', 'two', 'three', 'four'];
  allFilters: any[] = [];
  filteredOptions: Observable<string[]>;

  cloneAllFilters: any;

  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.allFilters = this.filter;
    this.filter.forEach(element => {
      this.allFilters.push(element.name);
    });
    // console.log('oleeee', this.allFilters);

    this.cloneAllFilters = [...this.allFilters];
    //  setTimeout(()=>{
    //   console.log('oleeeee', this.filter);

    //  },0)

  }

  ngDoCheck() {
    this.filteredOptions = this.filterControl.valueChanges
      .pipe(
        startWith(null),
        map((filter: string | null) => filter ? this._filter(filter) : this.allFilters.slice()),
        takeUntil(this._unsubscribeAll),
      );
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  /**
    * On destroy
    */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFilters.filter(filter => filter.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    // Add filter only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our filter
      if ((value || '').trim()) {
        console.log('rs', this.filters);


        if (this.filters.length > 0 && this.filters[this.filters.length - 1].value == null) {
          this.filters[this.filters.length - 1].value = value;
          /** Output filter */
          this.filterEmiter.emit(this.filters);
          /** Close autocomplete panel */
          // this.autocompleteTrigger.closePanel();
          /** Remove focus */
          // this.filterInput['nativeElement'].blur();
        }

      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.filterControl.setValue(null);
    }

  }

  remove(filter: any): void {
    const index = this.filters.indexOf(filter);

    if (index >= 0) {

      this.filters.splice(index, 1);

      /** Made to keep the same sequence of array elements 
       * "add at the position it was at first in the allFilters array" */
      let pos = this.cloneAllFilters.indexOf(filter.key);

      this.allFilters.splice(pos, 0, filter.key);
      this.filterEmiter.emit(this.filters);
      console.log(filter);
      console.log(this.allFilters);

    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    /** Check the type of selected filter, if data show calendar input else show text input */
    let type: any;
    this.filter.forEach(element => {
      if (element.name == event.option.viewValue) {
        if (element.type == 'date') {
          type = 'date';
        }
      }
    });
    /** */
    let newFilter = {
      key: event.option.viewValue,
      value: null,
      type: type
    };
    // this.filters.push(event.option.viewValue);
    this.filters.push(newFilter);
    this.removeFromAllFilters(newFilter);

    // this.filterInput.nativeElement.value = '';
    this.filterControl.setValue(null);
  }

  private removeFromAllFilters(filter) {

    this.allFilters.splice(this.allFilters.indexOf(filter.key), 1);
  }

  public handleShowAutocomplete() {
    if (this.filters.length == 0 || this.filters[this.filters.length - 1].value != null) {
      this.autocompleteTrigger.autocompleteDisabled = false;
      this.autocompleteTrigger.openPanel();
    } else {
      this.autocompleteTrigger.autocompleteDisabled = true;
      this.autocompleteTrigger.closePanel();
    }
    // console.log(this.autocompleteTrigger.autocompleteDisabled);
  }
}
