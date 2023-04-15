import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { WizardComponent } from './routes/wizard/wizard.component';
import { SetupComponent } from './routes/setup/setup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'setup', component: SetupComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
