import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai';
import { StorageKey, StorageService } from '../storage/storage.service';

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

  async getCharacters(): Promise<CharacterTextual[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const prompt = `Dê uma lista com 20 personagens (podem ser de filmes, séries, desenhos animados, jogos, contos, entre outros, que sejam brasileiros ou estrangeiros) que têm apelo infantil.
      A resposta deve ser dada no seguinte formato:
      - <Nome do personagem> - <Descrição do Personagem> - <Título do artigo do personagem na Wikipédia em português>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}]
      });

      const characters = completion.data.choices[0]?.message?.content?.trim().split('\n').map((character) => {
        const [name, description, articleTitle] = character.split(' - ');
        return {
          name: name.replace('-', '').trim(),
          description,
          articleTitle};
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

  async getRelatedCharacters(relatedCharacters: CharacterTextual[]): Promise<CharacterTextual[]> {
      try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = relatedCharacters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString}, dê uma lista com 4 personagens relacionados.
      A resposta deve ser dada no seguinte formato:
      - <Nome do personagem> - <Descrição do Personagem> - <Título do artigo do personagem na Wikipédia em português>`;

      const completion = await this.openAIApi.createChatCompletion({
        ...this.CREATE_CHAT_COMPLETION_REQUEST_SETTINGS,
        messages: [this.SYSTEM_CHAT_COMPLETION_MESSAGE, {role: 'user', content: prompt}]
      });

      const characters = completion.data.choices[0]?.message?.content?.trim().split('\n').map((character) => {
        const [name, description, articleTitle] = character.split(' - ');
        return {
          name: name.replace('-', '').trim(),
          description,
          articleTitle
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

  async getScenarioSuggestions(characters: CharacterTextual[]): Promise<Scenario[]> {
    try {
      if (!this.openAIApi) {
        throw new Error('OpenAI API is not initialized');
      }
      
      const relatedCharactersString = characters.map((character) => `${character.name}`).join(', ');

      const prompt = `Dado o(s) personagem(s) ${relatedCharactersString}, sugira 4 cenários (localizações) onde poderia acontecer uma história envolvendo eles.
      A resposta deve ser dada no seguinte formato:
      - <Título do cenário> - <Descrição do cenário>`;

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
      });
      
      if (scenarios == null) {
        throw new Error('Scenario array is null');
      }

      return scenarios;
    } catch (error) {
      console.log('Error while getting scenario suggestions', error);
      throw new Error('Error while getting scenario suggestions');
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

export enum OpenAIApiServiceStatus {
  ApiKeyNotSet = 'api-key-not-set',
  ApiKeyInvalid = 'api-key-invalid',
  Initializing = 'initializing',
  Initialized = 'initialized',
}

export interface CharacterTextual {
  name: string;
  description: string;
  articleTitle: string;
}

export interface Scenario {
  name: string;
  description: string;
}