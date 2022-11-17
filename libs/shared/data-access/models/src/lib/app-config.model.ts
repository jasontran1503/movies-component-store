import { InjectionToken, ValueProvider } from '@angular/core';

export interface AppConfig {
  production: boolean;
  baseUrl: string;
  apiKey: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('nx-the-movies.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value
});
