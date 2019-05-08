import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// the platformBrowserDynamic() seems to return
// bootstrapModule will pass a link to own module: app.module.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
