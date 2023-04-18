import { Injectable } from '@angular/core';
import wikipedia from 'wikipedia';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor() {}
  
  async getArticleMainPhoto(articleTitle: string) {
    const summary = await wikipedia.summary(articleTitle);
    return summary.thumbnail.source
  }
}
