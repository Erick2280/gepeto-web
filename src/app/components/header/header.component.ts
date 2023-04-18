import { Component } from '@angular/core';
import { OpenAIApiService, OpenAIApiServiceStatus } from 'src/app/services/openai-api/openai-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  OpenAIApiServiceStatus = OpenAIApiServiceStatus;

  constructor (public apiService: OpenAIApiService) {}
}
