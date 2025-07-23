import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth/auth.interceptor';
import 'zone.js';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    provideRouter(routes)
  ],
});