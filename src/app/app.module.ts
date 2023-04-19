import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage-angular';

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
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { CardBoxComponent } from './components/card-box/card-box.component';
import { WizardStepCharactersComponent } from './components/wizard-step-characters/wizard-step-characters.component';
import { WizardStepScenarioComponent } from './components/wizard-step-scenario/wizard-step-scenario.component';
import { WizardStepPlotComponent } from './components/wizard-step-plot/wizard-step-plot.component';
import { WizardStepIllustrationsComponent } from './components/wizard-step-illustrations/wizard-step-illustrations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WizardComponent,
    ViewerComponent,
    HeaderComponent,
    LogoComponent,
    PencilButtonComponent,
    SetupComponent,
    LoadingIndicatorComponent,
    CardBoxComponent,
    WizardStepCharactersComponent,
    WizardStepScenarioComponent,
    WizardStepPlotComponent,
    WizardStepIllustrationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot(),
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
