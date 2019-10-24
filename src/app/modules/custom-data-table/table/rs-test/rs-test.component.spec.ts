/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RsTestComponent } from './rs-test.component';

describe('RsTestComponent', () => {
  let component: RsTestComponent;
  let fixture: ComponentFixture<RsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
