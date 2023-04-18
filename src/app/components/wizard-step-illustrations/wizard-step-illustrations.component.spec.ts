import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepIllustrationsComponent } from './wizard-step-illustrations.component';

describe('WizardStepIllustrationsComponent', () => {
  let component: WizardStepIllustrationsComponent;
  let fixture: ComponentFixture<WizardStepIllustrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardStepIllustrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardStepIllustrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
