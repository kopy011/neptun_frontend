import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentLayoutComponent } from './components/student-layout/student-layout.component';
import { studentsFeatureKey, studentsReducer } from './store/students.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/students.effects';
import { SharedModule } from '../shared/shared.module';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { SubjectsModule } from '../subjects/subjects.module';

@NgModule({
  declarations: [StudentLayoutComponent, StudentEditComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentEffects]),
    StudentsRoutingModule,
    SharedModule,
    SubjectsModule,
  ],
})
export class StudentsModule {}
