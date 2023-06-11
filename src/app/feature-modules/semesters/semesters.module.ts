import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemestersRoutingModule } from './semesters-routing.module';
import {
  semestersFeatureKey,
  semestersReducer,
} from './store/semesters.reducer';
import { SemesterEffects } from './store/semesters.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SemesterLayoutComponent } from './components/semester-layout/semester-layout.component';
import { SemesterEditComponent } from './components/semester-edit/semester-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SemesterLayoutComponent, SemesterEditComponent],
  imports: [
    CommonModule,
    SemestersRoutingModule,
    StoreModule.forFeature(semestersFeatureKey, semestersReducer),
    EffectsModule.forFeature([SemesterEffects]),
    SharedModule,
  ],
})
export class SemestersModule {}
