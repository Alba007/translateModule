import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationComponent } from './components/translation/translation.component';
import { SystemConfigurationRoutingModule } from './system-configuration-routing.module';
import { SystemConfigContainerComponent } from './containers/system-config-container/system-config-container.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ViewEditKeyLanguageComponent } from './components/view-edit-key-language/view-edit-key-language.component';
import { AddLanguageComponent } from './components/add-language/add-language.component';
import { AddKeysComponent } from './components/add-keys/add-keys.component';

@NgModule({
  declarations: [
    SystemConfigContainerComponent,
    TranslationComponent,
    SettingsComponent,
    ViewEditKeyLanguageComponent,
    AddLanguageComponent,
    AddKeysComponent
  ],
  imports: [
    CommonModule,
    SystemConfigurationRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddLanguageComponent,
    AddKeysComponent
  ]
})
export class SystemConfigurationModule { }
