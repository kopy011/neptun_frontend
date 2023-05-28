import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsModalComponent } from './subjects-modal.component';

describe('SubjectsModalComponent', () => {
  let component: SubjectsModalComponent;
  let fixture: ComponentFixture<SubjectsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsModalComponent]
    });
    fixture = TestBed.createComponent(SubjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
