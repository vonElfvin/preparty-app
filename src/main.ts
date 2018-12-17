import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.toLowerCase().indexOf('samsung') === -1) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  })
  .catch(err => console.error(err));
