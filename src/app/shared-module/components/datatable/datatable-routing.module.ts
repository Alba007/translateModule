import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';
import { TestComponent } from './components/test/test.component';

const routes = [
  {
      path     : '',
      redirectTo: 'test'
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DatatableRoutingModule { }
