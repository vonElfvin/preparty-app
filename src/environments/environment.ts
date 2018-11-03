// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCOoRL1ti1v6L24JcE7srjT2_GeCZhKjKE',
    authDomain: 'preparty-app.firebaseapp.com',
    databaseURL: 'https://preparty-app.firebaseio.com',
    projectId: 'preparty-app',
    storageBucket: 'preparty-app.appspot.com',
    messagingSenderId: '415921951170'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
