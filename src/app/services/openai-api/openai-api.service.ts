import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai';
import { StorageKey, StorageService } from '../storage/storage.service';
import { Character } from '../story/story.service';

@Injectable({
  providedIn: 'root'
})
export class OpenAIApiService {
  serviceStatus: OpenAIApiServiceStatus = OpenAIApiServiceStatus.Initializing;
  openAIApi: OpenAIApi | null = null;
  initialization: Promise<void>;

  readonly SYSTEM_CHAT_COMPLETION_MESSAGE: ChatCompletionRequestMessage = {role: 'system', content: 'Você é um escritor de histórias para crianças.'};
  readonly CREATE_CHAT_COMPLETION_REQUEST_SETTINGS: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE],
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
  public readonly CHARACTER_GENERATION_AMOUNT = 11;
  public readonly RELATED_CHARACTER_GENERATION_AMOUNT = 3;
  public readonly SCENARIO_GENERATION_AMOUNT = 5;
  public readonly PLOT_GENERATION_AMOUNT = 4;

  constructor(private storageService: StorageService) {
    this.initialization = this.initialize();
  }

  async initialize() {
    const apiKey = await this.storageService.get(StorageKey.OpenAIApiKey);
    console.log('Initializing OpenAI API');

    if (!apiKey) {
      this.serviceStatus = OpenAIApiServiceStatus.ApiKeyNotSet;
      return;
    }
    
    try {
      const configuration = new Configuration({
        apiKey: await this.storageService.get(StorageKey.OpenAIApiKey),
      });
      const openAIApi = new OpenAIApi(configuration);
      await openAIApi.listModels();
      this.openAIApi = openAIApi;
      this.serviceStatus = OpenAIApiServiceStatus.Initialized;
    } catch (error) {
      this.serviceStatus = OpenAIApiServiceStatus.ApiKeyInvalid;
      console.log('OpenAI API key is invalid', error);
    }
  }

  async getCharacters(): Promise<CharacterSuggestion[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const prompt = `Dê uma lista com ${this.CHARACTER_GENERATION_AMOUNT} personagens (podem ser de filmes, séries, desenhos animados, jogos, contos, entre outros, que sejam brasileiros ou estrangeiros) que têm apelo infantil.
      A resposta deve ser dada no seguinte formato:
      - <Nome do personagem> - <Descrição do Personagem> - <URL do artigo do personagem na Wikipédia em português>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}]
      });

      const characters = completion.data.choices[0]?.message?.content?.trim().split('\n').map((character) => {
        const [name, description, articleUrl] = character.split(' - ');
        return {
          name: name.replace('-', '').trim(),
          description,
          articleUrl};
      });

      if (characters == null) {
        throw new Error('Character array is null');
      }

      return characters;
    } catch (error) {
      console.log('Error while getting characters', error);
      throw new Error('Error while getting characters');
    }
  }

  async getRelatedCharacters(relatedCharacters: CharacterSuggestion[]): Promise<CharacterSuggestion[]> {
      try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = relatedCharacters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString}, dê uma lista com ${this.RELATED_CHARACTER_GENERATION_AMOUNT} personagens relacionados.
      A resposta deve ser dada no seguinte formato:
      - <Nome do personagem> - <Descrição do Personagem> - <URL do artigo do personagem na Wikipédia em português>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}]
      });

      const characters = completion.data.choices[0]?.message?.content?.trim().split('\n').map((character) => {
        const [name, description, articleUrl] = character.split(' - ');
        return {
          name: name.replace('-', '').trim(),
          description,
          articleUrl
        };
      })

      if (characters == null) {
        throw new Error('Character array is null');
      }

      return characters;
    } catch (error) {
      console.log('Error while getting related characters', error);
      throw new Error('Error while getting related characters');
    }
  }

  async getScenarioSuggestions(characters: (CharacterSuggestion | Character)[]): Promise<ScenarioSuggestion[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = characters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString}, sugira ${this.SCENARIO_GENERATION_AMOUNT} locais onde poderia acontecer uma história envolvendo eles.
      A resposta deve ser dada no seguinte formato:
      - <Nome do local> - <Descrição apenas do local, sem citar personagens>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}],
      });

      const scenarios = completion.data.choices[0]?.message?.content?.trim().split('\n').map((scenario) => {
        const [name, description] = scenario.split(' - ');
        return {
          name: name.substring(2),
          description
        };
      }).filter((scenario) => scenario.name && scenario.description);
      
      if (scenarios == null) {
        throw new Error('Scenario array is null');
      }

      return scenarios;
    } catch (error) {
      console.log('Error while getting scenario suggestions', error);
      throw new Error('Error while getting scenario suggestions');
    }
  }

  async getPlotSuggestions(characters: (CharacterSuggestion | Character)[], scenarioPrompt: string): Promise<PlotSuggestion[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = characters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString} e o seguinte cenário: ${scenarioPrompt}, sugira ${this.PLOT_GENERATION_AMOUNT} enredos sucintos para uma história envolvendo eles.
      A resposta deve ser dada no seguinte formato:
      - <Insira o enredo aqui>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}],
      });

      const plots = completion.data.choices[0]?.message?.content?.trim().split('\n').map((plot) => {
        return {
          text: plot.substring(2)
        };
      }).filter((plot) => plot.text);
      
      if (plots == null) {
        throw new Error('Plot array is null');
      }

      return plots;
    } catch (error) {
      console.log('Error while getting plot suggestions', error);
      throw new Error('Error while getting plot suggestions');
    }
  }

  async generateStory(characters: Character[], scenario: string, plot: string): Promise<string[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = characters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString}, o seguinte cenário: ${scenario}, crie uma história com início, meio e fim, separada por parágrafos e com título, a parte do seguinte enredo:
      ${plot}`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}],
      });

      const story = completion.data.choices[0]?.message?.content?.trim().split('\n').filter((paragraph) => paragraph);
      
      if (story == null) {
        throw new Error('Story array is null');
      }

      return story;
    } catch (error) {
      console.log('Error while generating story', error);
      throw new Error('Error while generating story');
    }
  }

  async generateStoryImagePromps(story: string[]): Promise<string[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const prompt = `Leia a seguinte história:
      
      ${story.join('\n')}
      
      A partir da história, descreva em inglês uma ilustração para cada parágrafo da história. A resposta deve ser dada no seguinte formato:
      Illustration: <Insert description of illustration here>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}],
      });

      const imagePrompts = completion.data.choices[0]?.message?.content?.trim().split('\n').map(
        (imagePrompt) => imagePrompt.substring(14)
      ).filter((prompt) => prompt);
      
      if (imagePrompts == null) {
        throw new Error('Image prompts array is null');
      }

      return imagePrompts;
    } catch (error) {
      console.log('Error while generating story image prompts', error);
      throw new Error('Error while generating story image prompts');
    }
  }

  async translateToEnglish(text: string): Promise<string> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }

      const prompt = `Traduza para o inglês: ${text}`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [{role: 'system', content: 'Você é um assistente de tradução.'}, {role: 'user', content: prompt}],
      });

      const translation = completion.data.choices[0]?.message?.content?.trim();

      if (translation == null) {
        throw new Error('Translation is null');
      }

      return translation;
    } catch (error) {
      console.log('Error while getting translation', error);
      throw new Error('Error while getting translation');
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }

      const imageResponse = await this.openAIApi.createImage({
        prompt,
        n: 1,
        size: '512x512'
      })

      const imageUrl = imageResponse.data.data[0].url;

      if (imageUrl == null) {
        throw new Error('Image response is null');
      }

      return imageUrl;
    } catch (error) {
      console.log('Error while generating image', error);
      throw new Error('Error while generating image');
    }
  }
}

export const ART_STYLES: ArtStyle[] = [
  {
    name: 'Realista',
    prompt: 'Realistic style',
    sampleImageUrl: 'assets/samples/sample-realistic.png'
  },
  {
    name: 'Anime',
    prompt: 'Studio Ghibli style',
    sampleImageUrl: 'assets/samples/sample-anime.png'
  },
  {
    name: 'Mangá',
    prompt: 'Manga style',
    sampleImageUrl: 'assets/samples/sample-manga.png'
  },
  {
    name: 'Renascentista',
    prompt: 'Renaissance style',
    sampleImageUrl: 'assets/samples/sample-renaissance.png'
  }];

export enum OpenAIApiServiceStatus {
  ApiKeyNotSet = 'api-key-not-set',
  ApiKeyInvalid = 'api-key-invalid',
  Initializing = 'initializing',
  Initialized = 'initialized',
}

export interface CharacterSuggestion {
  name: string;
  description: string;
  articleUrl: string;
}
export interface ScenarioSuggestion {
  name: string;
  description: string;
}

export interface PlotSuggestion {
  text: string;
}

export interface ArtStyle {
  name: string;
  prompt: string;
  sampleImageUrl: string;
}