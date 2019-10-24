import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslationComponent } from './components/translation/translation.component';
import { SystemConfigContainerComponent } from './containers/system-config-container/system-config-container.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'translation',
    pathMatch: 'full'
    
  },
  
  {
    path: '',
    component: SystemConfigContainerComponent,
    children: [
      {
        path: 'translation',
        component: TranslationComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemConfigurationRoutingModule { }
