import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemesterLayoutComponent } from './components/semester-layout/semester-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SemesterLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemestersRoutingModule {}
