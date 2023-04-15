import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './routes/home/home.component';
import { WizardComponent } from './routes/wizard/wizard.component';
import { ViewerComponent } from './routes/viewer/viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { PencilButtonComponent } from './components/pencil-button/pencil-button.component';
import { SetupComponent } from './routes/setup/setup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WizardComponent,
    ViewerComponent,
    HeaderComponent,
    LogoComponent,
    PencilButtonComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
