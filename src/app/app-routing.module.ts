import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { WizardComponent } from './routes/wizard/wizard.component';
import { SetupComponent } from './routes/setup/setup.component';
import { OpenAIApiService, OpenAIApiServiceStatus } from './services/openai-api/openai-api.service';

const setupCompleteGuard = async () => {
  const routerService = inject(Router);
  const openAIApiService = inject(OpenAIApiService);
  await openAIApiService.initialization;
  if (openAIApiService.serviceStatus === OpenAIApiServiceStatus.Initialized) {
    return true;
  } else {
    return routerService.parseUrl('/setup');
  }
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wizard', component: WizardComponent, canActivate: [setupCompleteGuard] },
  { path: 'setup', component: SetupComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
