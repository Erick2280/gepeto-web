import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OpenAIApiService } from 'src/app/services/openai-api/openai-api.service';
import { StoryService } from 'src/app/services/story/story.service';
import Vivus from 'vivus';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, AfterViewInit {
  status: StoryGenerationStatus = StoryGenerationStatus.GeneratingStory;
  vivusInstance: Vivus | null = null;
  title: string = '';
  story: string[] = [];
  storyImageUrls: string[] = [];

  StoryGenerationStatus = StoryGenerationStatus;

  constructor(private apiService: OpenAIApiService, private storyService: StoryService) {}

  ngOnInit(): void {
    this.generateStory();
  }

  ngAfterViewInit(): void {
    this.vivusInstance = new Vivus('animated-pencil', {duration: 400, animTimingFunction: Vivus.EASE_OUT, start: 'manual'}, (vivusInstance) => {
      vivusInstance.play(vivusInstance.getStatus() === 'end' ? -1 : 1);
    });
    this.vivusInstance?.play(() => {});
  }

  async generateStory() {
    this.story = await this.apiService.generateStory(this.storyService.selectedCharacters, this.storyService.scenarioDescription, this.storyService.plot);
    this.title = this.story[0];
    this.story = this.story.slice(1);

    this.status = StoryGenerationStatus.GeneratingStoryImagePrompts;
    const storyImagePrompts = await this.apiService.generateStoryImagePromps(this.story);
    
    this.status = StoryGenerationStatus.GeneratingStoryImages

    for (const storyImagePrompt of storyImagePrompts) {
      try {
        this.storyImageUrls.push(await this.apiService.generateImage(storyImagePrompt + ' ' + this.storyService.selectedArtStyle?.prompt));
      } catch (error) {
        this.storyImageUrls.push('assets/artworks/empty-artboard.svg');
      }
    }

    this.status = this.StoryGenerationStatus.Ready
  }
}

enum StoryGenerationStatus {
  GeneratingStory = 'generating-story',
  GeneratingStoryImagePrompts = 'generating-story-image-prompts',
  GeneratingStoryImages = 'generating-story-images',
  Ready = 'ready'
}