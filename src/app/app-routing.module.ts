import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: () =>
      import('./feature-modules/teachers/teachers.module').then(
        (m) => m.TeachersModule
      ),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./feature-modules/subjects/subjects.module').then(
        (m) => m.SubjectsModule
      ),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./feature-modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: 'semesters',
    loadChildren: () =>
      import('./feature-modules/semesters/semesters.module').then(
        (m) => m.SemestersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
