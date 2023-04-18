import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepScenarioComponent } from './wizard-step-scenario.component';

describe('WizardStepScenarioComponent', () => {
  let component: WizardStepScenarioComponent;
  let fixture: ComponentFixture<WizardStepScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardStepScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardStepScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
