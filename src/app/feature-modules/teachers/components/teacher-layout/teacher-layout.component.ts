import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { teachersRequestedAction } from '../../store/teachers.actions';
import { selectTeachers } from '../../store/teachers.selectors';
import { Teacher, TeacherFilter } from 'src/app/models/Teacher';
import { Column } from 'src/app/models/components/Column';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Classification } from 'src/app/models/enums/Classification';
import { TableActions } from 'src/app/models/enums/TableActions';
import { distinctUntilChanged } from 'rxjs';

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
      filter: {
        value: 'neptunCode',
      },
      priority: false,
    },
    {
      title: 'Név',
      value: 'name',
      compare: (a: Teacher, b: Teacher) => a.name.localeCompare(b.name),
      filter: {
        value: 'name',
      },
      priority: false,
    },
    {
      title: 'Email',
      value: 'email',
      compare: (a: Teacher, b: Teacher) => a.email.localeCompare(b.email),
      filter: {
        value: 'email',
      },
      priority: false,
    },
    {
      title: 'Beosztás',
      value: 'classification',
      compare: (a: Teacher, b: Teacher) =>
        a.classification.localeCompare(b.classification),
      filter: {
        value: 'classification',
      },
      priority: false,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(teachersRequestedAction({}));

    this.teachers$
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((teachers) => {
        this.teachers = teachers;
      });
  }

  teachers$ = this.store.pipe(select(selectTeachers));
  teachers?: Array<Teacher>;
  editedTeacher?: Teacher;

  tableActions: Array<TableActions> = ['edit', 'subjects'];

  showSubjectsModal = false;
  showEditModal = false;

  onNewTeacherAction(): void {
    this.editedTeacher = {
      neptunCode: '',
      name: '',
      email: '',
      classification: '' as Classification,
    } as Teacher;
    this.showEditModal = true;
  }

  onEditClose(): void {
    this.editedTeacher = undefined;
    this.showEditModal = false;
    this.store.dispatch(teachersRequestedAction({}));
  }

  onEditAction(teacher: Teacher): void {
    this.editedTeacher = teacher;
    this.showEditModal = true;
  }

  onSubjectsAction(teacher: Teacher): void {
    this.editedTeacher = teacher;
    this.showSubjectsModal = true;
  }

  onSubjectsOk(): void {
    this.editedTeacher = undefined;
    this.showSubjectsModal = false;
  }

  onFilter(teacherFilter: TeacherFilter): void {
    this.store.dispatch(teachersRequestedAction({ teacherFilter }));
  }
}
