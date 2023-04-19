import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacterSuggestion, OpenAIApiService } from 'src/app/services/openai-api/openai-api.service';
import { WikipediaService } from 'src/app/services/wikipedia/wikipedia.service';
import { Character, StoryService, STATIC_CHARACTERS } from 'src/app/services/story/story.service';
import { sampleSize } from 'lodash';

@Component({
  selector: 'app-wizard-step-characters',
  templateUrl: './wizard-step-characters.component.html',
  styleUrls: ['./wizard-step-characters.component.css']
})
export class WizardStepCharactersComponent implements OnInit {
  characters: Character[] = [];
  relatedCharacters: Character[] = [];
  status: WizardStepCharactersStatus = WizardStepCharactersStatus.FetchingCharacters;
  customCharacterName: string = '';
  placeholders: null[] = Array(this.apiService.CHARACTER_GENERATION_AMOUNT).fill(null);

  WizardStepCharactersStatus = WizardStepCharactersStatus;
  
  constructor(private apiService: OpenAIApiService, private wikipediaService: WikipediaService, public storyService: StoryService) {
  }

  async ngOnInit(): Promise<void> {    
    this.characters = STATIC_CHARACTERS // sampleSize(STATIC_CHARACTERS, this.apiService.CHARACTER_GENERATION_AMOUNT);
    this.status = WizardStepCharactersStatus.Ready;
  }

  async getCharactersSuggestions(): Promise<CharacterSuggestion[]> {
    const characterSuggestions = await this.apiService.getCharacters();
    return characterSuggestions;
  }
  
  async getCharactersFromSuggestions(characterSuggestions: CharacterSuggestion[]): Promise<Character[]> {
    const characters: Character[] = await Promise.all(characterSuggestions.map(async character => {
      const articleName = character.articleUrl.split('/').pop();

      return {
        name: character.name,
        description: character.description,
        imageUrl: articleName ? (await this.wikipediaService.getArticleMainPhoto(articleName) ?? undefined) : undefined
      }
    }));

    return characters;
  }

  toggleCharacterSelection(characterToToggle: Character) {
    if (this.storyService.selectedCharacters.find(character => character.name.toLowerCase() === characterToToggle.name.toLowerCase())) {
      this.unselectCharacter(characterToToggle);
    } else {
      this.selectCharacter(characterToToggle);
    }
  }

  selectCharacter(character: Character) {
    if (this.status !== WizardStepCharactersStatus.Ready) return;
    
    this.storyService.selectedCharacters.push(character);
    // this.getRelatedCharacters();
  }

  unselectCharacter(characterToUnselect: Character) {
    this.storyService.selectedCharacters = this.storyService.selectedCharacters.filter(character => character.name.toLowerCase() !== characterToUnselect.name.toLowerCase());
  }

  createCustomCharacter() {
    if (!this.customCharacterName || this.storyService.selectedCharacters.find(character => character.name.toLowerCase() === this.customCharacterName.toLowerCase())) return;
    
    this.storyService.selectedCharacters.push({
      name: this.customCharacterName,
      description: '',
      imageUrl: ''
    });

    this.customCharacterName = '';
  }

  isSelected(character: Character) {
    return Boolean(this.storyService.selectedCharacters.find(selectedCharacter => selectedCharacter.name.toLowerCase() === character.name.toLowerCase()));
  }

  async getRelatedCharacters() {
    const relatedCharacterSuggestions = await this.apiService.getRelatedCharacters(this.storyService.selectedCharacters.map(
      character => {
        return {
          name: character.name,
          description: character.description,
          articleUrl: ''
        }
      }
    ))
    this.relatedCharacters = relatedCharacterSuggestions.map(character => {
      return {
        name: character.name,
        description: character.description,
        imageUrl: ''
      }
    });
  }
}

enum WizardStepCharactersStatus {
  FetchingCharacters = 'fetching-characters',
  FetchingImages = 'fetching-images',
  Ready = 'ready'
}