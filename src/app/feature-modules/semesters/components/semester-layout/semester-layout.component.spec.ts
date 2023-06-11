import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterLayoutComponent } from './semester-layout.component';

describe('SemesterLayoutComponent', () => {
  let component: SemesterLayoutComponent;
  let fixture: ComponentFixture<SemesterLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterLayoutComponent]
    });
    fixture = TestBed.createComponent(SemesterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
