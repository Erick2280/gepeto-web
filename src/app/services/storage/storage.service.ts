import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private store: Promise<Storage>;

  constructor(private storage: Storage) {
    this.store = this.storage.create();
  }

  async get(key: StorageKey) {
    return (await this.store).get(key);
  }

  async set(key: StorageKey, value: unknown) {
    return (await this.store).set(key, value);
  }

  async remove(key: StorageKey) {
    return (await this.store).remove(key);
  }

  async clear() {
    return (await this.store).clear();
  }
}

export enum StorageKey {
  OpenAIApiKey = 'openai-api-key',
}
