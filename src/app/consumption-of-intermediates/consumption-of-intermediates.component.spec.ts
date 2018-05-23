/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsumptionOfIntermediatesComponent } from './consumption-of-intermediates.component';

describe('ConsumptionOfIntermediatesComponent', () => {
  let component: ConsumptionOfIntermediatesComponent;
  let fixture: ComponentFixture<ConsumptionOfIntermediatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionOfIntermediatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionOfIntermediatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
