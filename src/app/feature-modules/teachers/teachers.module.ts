import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { StoreModule } from '@ngrx/store';
import { teachersFeatureKey, teachersReducer } from './store/teachers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TeacherEffects } from './store/teachers.effects';
import { SharedModule } from '../shared/shared.module';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';
import { SubjectsModule } from '../subjects/subjects.module';

@NgModule({
  declarations: [TeacherLayoutComponent, TeacherEditComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    StoreModule.forFeature(teachersFeatureKey, teachersReducer),
    EffectsModule.forFeature([TeacherEffects]),
    SharedModule,
    SubjectsModule,
  ],
})
export class TeachersModule {}
