import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { StoreModule } from '@ngrx/store';
import { subjectsFeatureKey, subjectsReducer } from './store/subjects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SubjectEffects } from './store/subjects.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    StoreModule.forFeature(subjectsFeatureKey, subjectsReducer),
    EffectsModule.forFeature([SubjectEffects]),
  ],
})
export class SubjectsModule {}
