import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransitsComponent } from './components/transits/transits.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { ViewTransitComponent } from './components/view-transit/view-transit.component';
import { SharedModule } from '../../shared-module/shared.module';

@NgModule({
  declarations: [
    TransitsComponent,
    ViewTransitComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    SharedModule
  ]
})
export class MonitoringModule { }
