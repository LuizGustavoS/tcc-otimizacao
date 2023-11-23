import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InfoModule} from "./modules/info/info.module";
import {ErrorIntercept} from "./core/error.interceptor";
import {MatTabsModule} from "@angular/material/tabs";
import {LoaderInterceptor} from "./core/loader.interceptor";
import {LoaderComponent} from "./core/loader/loader.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTabsModule,

        InfoModule,
        DashboardModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatButtonModule
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
