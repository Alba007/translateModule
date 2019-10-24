// import {FuseNavigation} from '@fuse/types';
import { SsoService } from "../../../sso-implementation/helpers/sso.service";
import { Injectable } from "@angular/core";
import { FuseNavigation } from "../../../@fuse/types";

@Injectable({
    providedIn: "root"
})
export class Role {

    static isAdmin = true;
    constructor(
        // public sso: SsoService
    ) {
        // Role.isAdmin = true; //this.sso.hasRole("admin")
        // console.log("===================================> " + Role.isAdmin)
    }
}

export const navigation: FuseNavigation[] = [

    {
        id: 'homePortal',
        title: 'HomePortal',
        translate: 'Home Portal',
        type: 'item',
        icon: 'home',
        url: '/portal'
    },

    {
        id: 'userManagment',
        title: 'UserManagement',
        translate: 'User Management',
        type: 'collapsable',
        icon: 'person',
        children: [
            {
                id: 'roles',
                title: 'Roles',
                translate: 'Roles',
                type: 'item',
                url: '/usersManage/roles'
            },
            {
                id: 'user',
                title: 'User',
                translate: 'User',
                type: 'item',
                url: '/usersManage/user'
            },
            {
                id: 'users',
                title: 'Test',
                translate: 'Test',
                type: 'item',
                url: '/usersManage/users'
            },
            {
                id: 'users',
                title: 'Test',
                translate: 'Test Data List',
                type: 'item',
                url: '/usersManage/testDataList'
            }
        ]
    },

    {
        id: 'monitoring',
        title: 'Monitoring',
        translate: 'Monitoring',
        type: 'collapsable',
        icon: 'tv',
        children: [
            {
                id: 'transits',
                title: 'Transits',
                translate: 'Transits',
                type: 'item',
                url: '/monitoring/transits'
            }
        ]
    },

    {
        id: 'system-config',
        title: 'System Configuration',
        type: 'group',
        icon: '',
        children: [
            {
                id: 'system-messages',
                title: 'System Messages Config',
                type: 'item',
                icon: 'developer_board',
                url: '/system-message'
            },
        ]
    },

    
];
