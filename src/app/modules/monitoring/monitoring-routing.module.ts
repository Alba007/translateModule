import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TransitsComponent } from './components/transits/transits.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transits',
    pathMatch: 'full'
  },
  {path: 'transits', component: TransitsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MonitoringRoutingModule { }
