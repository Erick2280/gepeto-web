import { Injectable } from '@angular/core';
import wikipedia from 'wikipedia';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor() {}
  
  async getArticleMainPhoto(articleTitle: string): Promise<string | null> {
    try {
      wikipedia.setLang('pt');
      const summary = await wikipedia.summary(articleTitle);
      return summary.thumbnail.source
    } catch {
      return null
    }
  }
}
