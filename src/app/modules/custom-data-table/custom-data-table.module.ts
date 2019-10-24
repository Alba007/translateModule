import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableSettingsComponent } from './table/table-settings/table-settings.component';
import { SearchComponent } from './table/search/search.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { RsTestComponent } from './table/rs-test/rs-test.component';
import { NestedObjectPipe } from './pipes/nested-object.pipe';
import { KeyPipe } from './pipes/key.pipe';
import { IsDatePipe } from './pipes/is-date.pipe';
import { IsArrayPipe } from './pipes/is-Array.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent,
    TableSettingsComponent,
    SearchComponent,
    AutofocusDirective,
    RsTestComponent,
    NestedObjectPipe,
    KeyPipe,
    IsDatePipe,
    IsArrayPipe
 ],
 imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
 ],
 exports: [
    TableComponent,
    
 ]
})
export class CustomDataTableModule { }
