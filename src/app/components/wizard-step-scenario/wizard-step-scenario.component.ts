import { Component, OnInit } from '@angular/core';
import { OpenAIApiService, ScenarioSuggestion } from 'src/app/services/openai-api/openai-api.service';
import { StoryService } from 'src/app/services/story/story.service';

@Component({
  selector: 'app-wizard-step-scenario',
  templateUrl: './wizard-step-scenario.component.html',
  styleUrls: ['./wizard-step-scenario.component.css']
})
export class WizardStepScenarioComponent implements OnInit {
  imageUrl = 'assets/artworks/empty-artboard.svg';
  imageAlternativeText = 'Quadro de arte vazio';
  suggestions: ScenarioSuggestion[] = [];
  placeholders: null[] = Array(this.apiService.SCENARIO_GENERATION_AMOUNT).fill(null);
  status: WizardStepScenarioStatus = WizardStepScenarioStatus.FetchingSuggestions;

  WizardStepScenarioStatus = WizardStepScenarioStatus;

  constructor(private apiService: OpenAIApiService, public storyService: StoryService) { }

  ngOnInit(): void {
    this.getSuggestions();
  }

  async getSuggestions() {
    this.suggestions = await this.apiService.getScenarioSuggestions(this.storyService.selectedCharacters);
    this.status = WizardStepScenarioStatus.AwaitingUserInput;
  }

  copySuggestionToPrompt(suggestion: ScenarioSuggestion) {
    this.storyService.scenarioDescription = suggestion.description;
  }

  async generateFromPrompt() {
    this.status = WizardStepScenarioStatus.GeneratingImage;
    this.imageUrl = 'assets/artworks/empty-artboard.svg';
    const englishPrompt = await this.apiService.translateToEnglish(this.storyService.scenarioDescription);
    this.imageUrl = await this.apiService.generateImage(englishPrompt);
    this.status = WizardStepScenarioStatus.AwaitingUserInput;
  }
}

enum WizardStepScenarioStatus {
  FetchingSuggestions = 'fetching-suggestions',
  AwaitingUserInput = 'awaiting-user-input',
  GeneratingImage = 'generating-image',
}