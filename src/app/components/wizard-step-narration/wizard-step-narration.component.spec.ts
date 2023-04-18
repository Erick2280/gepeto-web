import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepNarrationComponent } from './wizard-step-narration.component';

describe('WizardStepNarrationComponent', () => {
  let component: WizardStepNarrationComponent;
  let fixture: ComponentFixture<WizardStepNarrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardStepNarrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardStepNarrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
