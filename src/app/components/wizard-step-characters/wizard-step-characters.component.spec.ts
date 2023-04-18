import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepCharactersComponent } from './wizard-step-characters.component';

describe('WizardStepCharactersComponent', () => {
  let component: WizardStepCharactersComponent;
  let fixture: ComponentFixture<WizardStepCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardStepCharactersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardStepCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
