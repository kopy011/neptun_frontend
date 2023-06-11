import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectLayoutComponent } from './components/subject-layout/subject-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {}
