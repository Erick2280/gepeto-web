import { TestBed } from '@angular/core/testing';

import { OpenAIApiService } from './openai-api.service';

describe('OpenAIApiService', () => {
  let service: OpenAIApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAIApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
