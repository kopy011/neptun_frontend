import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { StoreModule } from '@ngrx/store';
import { subjectsFeatureKey, subjectsReducer } from './store/subjects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SubjectEffects } from './store/subjects.effects';
import { SharedModule } from '../shared/shared.module';
import { SubjectLayoutComponent } from './components/subject-layout/subject-layout.component';
import { SubjectEditComponent } from './components/subject-edit/subject-edit.component';
import { SemestersModule } from '../semesters/semesters.module';

@NgModule({
  declarations: [SubjectLayoutComponent, SubjectEditComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    StoreModule.forFeature(subjectsFeatureKey, subjectsReducer),
    EffectsModule.forFeature([SubjectEffects]),
    SharedModule,
    SemestersModule,
  ],
})
export class SubjectsModule {}
