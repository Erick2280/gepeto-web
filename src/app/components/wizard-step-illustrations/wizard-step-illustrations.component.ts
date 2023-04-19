import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story/story.service';
import { ART_STYLES, ArtStyle } from 'src/app/services/openai-api/openai-api.service';

@Component({
  selector: 'app-wizard-step-illustrations',
  templateUrl: './wizard-step-illustrations.component.html',
  styleUrls: ['./wizard-step-illustrations.component.css']
})
export class WizardStepIllustrationsComponent {

  ART_STYLES = ART_STYLES;

  constructor(public storyService: StoryService) {}

  selectArtStyle(artStyle: ArtStyle) {
    this.storyService.selectedArtStyle = artStyle;
  }

  isArtStyleSelected(artStyle: ArtStyle) {
    return this.storyService.selectedArtStyle === artStyle;
  }
}
