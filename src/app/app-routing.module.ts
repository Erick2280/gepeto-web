import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { WizardComponent } from './routes/wizard/wizard.component';
import { SetupComponent } from './routes/setup/setup.component';
import { OpenAIApiService, OpenAIApiServiceStatus } from './services/openai-api/openai-api.service';
import { ViewerComponent } from './routes/viewer/viewer.component';
import { StoryService } from './services/story/story.service';

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

const storyReadyGuard = async () => {
  const routerService = inject(Router);
  const storyService = inject(StoryService);
  if (storyService.selectedCharacters.length > 0 && storyService.scenarioDescription && storyService.selectedArtStyle && storyService.plot) {
    return true
  } else {
    return routerService.parseUrl('/wizard')
  }
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wizard', component: WizardComponent, canActivate: [setupCompleteGuard] },
  { path: 'setup', component: SetupComponent },
  { path: 'viewer', component: ViewerComponent, canActivate: [setupCompleteGuard, storyReadyGuard ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
