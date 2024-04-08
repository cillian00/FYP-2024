import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './front-end-application/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
