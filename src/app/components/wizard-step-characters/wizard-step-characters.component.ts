import { Component, OnInit } from '@angular/core';
import { OpenAIApiService } from 'src/app/services/openai-api/openai-api.service';
import { WikipediaService } from 'src/app/services/wikipedia/wikipedia.service';

@Component({
  selector: 'app-wizard-step-characters',
  templateUrl: './wizard-step-characters.component.html',
  styleUrls: ['./wizard-step-characters.component.css']
})
export class WizardStepCharactersComponent implements OnInit {
  
  
  constructor(private apiService: OpenAIApiService, private wikipediaService: WikipediaService) {
    
  }

  ngOnInit(): void {
    
  }
}
