import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeptunTableComponent } from './neptun-table.component';

describe('NeptunTableComponent', () => {
  let component: NeptunTableComponent;
  let fixture: ComponentFixture<NeptunTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeptunTableComponent]
    });
    fixture = TestBed.createComponent(NeptunTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
