import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { SelectedBarComponent } from './components/selected-bar/selected-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableRoutingModule } from './datatable-routing.module';
import { TestComponent } from './components/test/test.component';
import { MaterialModule } from '../../../material.module';
// import { MaterialModule } from '../../material.module';
// import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [
    DatatableComponent,
    SelectedBarComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DatatableRoutingModule,
    // FuseSharedModule
  ]
})
export class DatatableModule { }
