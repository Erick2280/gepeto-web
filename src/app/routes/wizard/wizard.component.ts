import { Component } from '@angular/core';
import { OpenAIApiService, OpenAIApiServiceStatus } from 'src/app/services/openai-api/openai-api.service';
import { StoryService } from 'src/app/services/story/story.service';
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

  constructor(public apiService: OpenAIApiService, public wikipediaService: WikipediaService, private storyService: StoryService) {}

  goToStep(step: WizardStep) {
    this.currentStep = step;
  }

  canGoToStep(step: WizardStep) {
    const stepToConditionTuple: [WizardStep, () => boolean][] = [
      [WizardStep.Characters, () => true],
      [WizardStep.Scenario, () => this.storyService.selectedCharacters.length > 0],
      [WizardStep.Plot, () => this.storyService.scenarioDescription !== ''],
      [WizardStep.Illustrations, () => this.storyService.plot !== ''],
    ];
    
    for (const [stepToCheck, condition] of stepToConditionTuple) {
      if (stepToCheck === step) {
        return condition();
      } else if (!condition()) {
        return false;
      }
    }

    return true;
  }
}

enum WizardStep {
  Characters = 'characters',
  Scenario = 'scenario',
  Plot = 'plot',
  Illustrations = 'illustrations',
}