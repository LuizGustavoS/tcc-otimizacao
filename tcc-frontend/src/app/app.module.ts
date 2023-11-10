import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadModule} from "./modules/upload/upload.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InfoModule} from "./modules/info/info.module";
import {ErrorIntercept} from "./core/error.interceptor";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,

    InfoModule,
    UploadModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
