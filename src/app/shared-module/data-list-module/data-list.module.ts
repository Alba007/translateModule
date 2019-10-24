import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';
import { MultipleActionsComponent } from './data-list/multiple-actions/multiple-actions.component';
import { SortComponent } from './data-list/sort/sort.component';
import { SearchComponent } from './data-list/search/search.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DataListComponent,
    MultipleActionsComponent,
    SortComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    DataListComponent
  ]
})
export class DataListModule { }
