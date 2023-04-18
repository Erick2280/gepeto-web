import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepPlotComponent } from './wizard-step-plot.component';

describe('WizardStepPlotComponent', () => {
  let component: WizardStepPlotComponent;
  let fixture: ComponentFixture<WizardStepPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardStepPlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardStepPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
