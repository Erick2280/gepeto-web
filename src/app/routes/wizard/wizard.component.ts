import { Component } from '@angular/core';
import { OpenAIApiService, OpenAIApiServiceStatus } from 'src/app/services/openai-api/openai-api.service';
import { WikipediaService } from 'src/app/services/wikipedia/wikipedia.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
  currentStep: WizardStep = WizardStep.Characters;

  OpenAIApiServiceStatus = OpenAIApiServiceStatus;
  WizardStep = WizardStep;

  constructor(public apiService: OpenAIApiService, public wikipediaService: WikipediaService) {}
}

enum WizardStep {
  Characters = 'characters',
  Scenario = 'scenario',
  Plot = 'plot',
  Illustrations = 'illustrations',
  Narration = 'narration',
}