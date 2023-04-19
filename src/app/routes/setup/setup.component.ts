import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenAIApiService, OpenAIApiServiceStatus } from 'src/app/services/openai-api/openai-api.service';
import { StorageKey, StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  apiKey = '';
  setupStatus: SetupStatus = SetupStatus.AwaitingUserInput;

  SetupStatus = SetupStatus;
  OpenAIApiServiceStatus = OpenAIApiServiceStatus;

  constructor (public apiService: OpenAIApiService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
  }

  async continueSetup() {
    this.setupStatus = SetupStatus.InProgress;
    await this.setApiKey(this.apiKey);

    if (this.apiService.serviceStatus === OpenAIApiServiceStatus.Initialized) {
      this.setupStatus = SetupStatus.Completed;
      this.router.navigateByUrl('/wizard');
    } else {
      this.setupStatus = SetupStatus.AwaitingUserInput;
    }
  }

  async setApiKey(apiKey: string) {
    await this.storageService.set(StorageKey.OpenAIApiKey, apiKey);
    await this.apiService.initialize();
  }
}

enum SetupStatus {
  AwaitingUserInput = 'awaiting-user-input',
  InProgress = 'in-progress',
  Completed = 'completed',
}
