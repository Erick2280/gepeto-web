import { Component, OnInit } from '@angular/core';
import { OpenAIApiService, PlotSuggestion } from 'src/app/services/openai-api/openai-api.service';
import { StoryService } from 'src/app/services/story/story.service';

@Component({
  selector: 'app-wizard-step-plot',
  templateUrl: './wizard-step-plot.component.html',
  styleUrls: ['./wizard-step-plot.component.css']
})
export class WizardStepPlotComponent implements OnInit {
  plotSuggestions: PlotSuggestion[] = [];
  status: WizardStepPlotStatus = WizardStepPlotStatus.FetchingSuggestions;
  placeholders: null[] = Array(this.apiService.PLOT_GENERATION_AMOUNT).fill(null);

  WizardStepPlotStatus = WizardStepPlotStatus;

  constructor(private apiService: OpenAIApiService, public storyService: StoryService) { }

  ngOnInit(): void {
    this.getPlotSuggestions();
  }

  async getPlotSuggestions() {
    const plotSuggestions = await this.apiService.getPlotSuggestions(this.storyService.selectedCharacters, this.storyService.scenarioDescription);
    this.plotSuggestions = plotSuggestions;
    this.status = WizardStepPlotStatus.AwaitingUserInput;
  }

  selectPlotSuggestion(plotSuggestion: PlotSuggestion) {
    this.storyService.plot = plotSuggestion.text;
  }
}

enum WizardStepPlotStatus {
  FetchingSuggestions = 'fetching-suggestions',
  AwaitingUserInput = 'awaiting-user-input'
}
