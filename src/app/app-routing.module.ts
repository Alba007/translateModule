import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404Component } from './base-layout/components/404/error-404.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RandomGuard } from './auth/guards/random.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/portal' },
    {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'portal', loadChildren: './modules/portal-module/portal.module#PortalModule',
        // canActivate: [RandomGuard],
        // canLoad: [RandomGuard]
        data: { title: 'Portal', breadcrumb: 'Portal' },

    },
    {
        path: 'usersManage', loadChildren: './modules/user-management-module/user-management.module#UserManagementModule',
        // canActivate: [RandomGuard],
        // canLoad: [RandomGuard]
    },
    {
        path: 'system-config', loadChildren: './modules/system-configuration/system-configuration.module#SystemConfigurationModule',
        // canActivate: [RandomGuard],
        // canLoad: [RandomGuard]
    },
    // { path: 'system-message', loadChildren: './modules/system-message-config/system-message-config.module#SystemMessageConfigModule' },
    { path: 'monitoring', loadChildren: './modules/monitoring/monitoring.module#MonitoringModule' },
    {
        path: '**',
        component: Error404Component
    }
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: '**', redirectTo: 'home'},
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
