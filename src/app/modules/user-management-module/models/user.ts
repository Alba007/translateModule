export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    systemRole: string;
    applicationRoles: RolesPerApp[];
    settings?: UserPreferences;
    active: boolean;
}

interface RolesPerApp {
    app: string;
    role: string;
}

interface UserPreferences {
    language: string;
    timezone: string;
    colorTheme: string;
}