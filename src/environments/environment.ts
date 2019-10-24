
export const environment = {
    production: false,
    apiGatewayHost: 'http://localhost:4000/',
    enableAuth: false,
    language: 'en',

    SERVER_URI: 'http://localhost:4000',
    SSO_APP_NAME: 'dss',
    SSO_APPLICATION_URI: 'http://ovh1.rayonit.com:9456',
    SSO_SERVER_URI: 'http://ovh1.rayonit.com:9455',

    hmr: false,

    domain: 'http://localhost:8082',
    datatable: 'http://localhost:8080'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
