import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { teachersRequestedAction } from '../../store/teachers.actions';
import { selectTeachers } from '../../store/teachers.selectors';
import { Teacher } from 'src/app/models/Teacher';
import { Column } from 'src/app/models/components/Column';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.css'],
})
export class TeacherLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  teacherColumns: Array<Column> = [
    {
      title: 'Neptun kód',
      value: 'neptunCode',
      compare: (a: Teacher, b: Teacher) =>
        a.neptunCode.localeCompare(b.neptunCode),
      priority: false,
    },
    {
      title: 'Név',
      value: 'name',
      compare: (a: Teacher, b: Teacher) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Email',
      value: 'email',
      compare: (a: Teacher, b: Teacher) => a.email.localeCompare(b.email),
      priority: false,
    },
    {
      title: 'Beosztás',
      value: 'classification',
      compare: (a: Teacher, b: Teacher) =>
        a.classification.localeCompare(b.classification),
      priority: false,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(teachersRequestedAction());

    this.teachers$.pipe(untilDestroyed(this)).subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  teachers$ = this.store.pipe(select(selectTeachers));
  teachers?: Array<Teacher>;
  editedTeacher?: any;
  showModal = false;

  openModal(teacher: Teacher): void {
    this.editedTeacher = teacher;
    this.showModal = true;
  }

  onUpdate(teacher: Teacher) {
    this.editedTeacher = teacher;
    this.showModal = true;
  }

  onOk() {
    this.editedTeacher = undefined;
    this.showModal = false;
  }
}
