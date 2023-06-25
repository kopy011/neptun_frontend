import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth-guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./feature-modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard()],
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./feature-modules/teachers/teachers.module').then(
        (m) => m.TeachersModule
      ),
    canActivate: [authGuard()],
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./feature-modules/subjects/subjects.module').then(
        (m) => m.SubjectsModule
      ),
    canActivate: [authGuard()],
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./feature-modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
    canActivate: [authGuard()],
  },
  {
    path: 'semesters',
    loadChildren: () =>
      import('./feature-modules/semesters/semesters.module').then(
        (m) => m.SemestersModule
      ),
    canActivate: [authGuard()],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature-modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
