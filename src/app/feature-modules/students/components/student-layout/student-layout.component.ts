import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  studentUpdateAction,
  studentsRequestedAction,
} from '../../store/students.actions';
import { selectStudents } from '../../store/students.selectors';
import { Student, StudentFilter } from 'src/app/models/Student';
import { Column } from 'src/app/models/components/Column';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableActions } from 'src/app/models/enums/TableActions';
import { distinctUntilChanged } from 'rxjs';
import { Major } from 'src/app/models/enums/Major';

@UntilDestroy()
@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css'],
})
export class StudentLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  studentColumns: Array<Column> = [
    {
      title: 'Neptun kód',
      value: 'neptunCode',
      compare: (a: Student, b: Student) =>
        a.neptunCode.localeCompare(b.neptunCode),
      filter: {
        value: 'neptunCode',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Név',
      value: 'name',
      compare: (a: Student, b: Student) => a.name.localeCompare(b.name),
      filter: {
        value: 'name',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Email',
      value: 'email',
      compare: (a: Student, b: Student) => a.email.localeCompare(b.email),
      filter: {
        value: 'email',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Szak',
      value: 'major',
      compare: (a: Student, b: Student) => a.major.localeCompare(b.major),
      filter: {
        value: 'major',
        type: 'text',
      },
      priority: false,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(studentsRequestedAction({}));

    this.students$
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((students) => {
        this.students = students;
      });
  }

  students$ = this.store.pipe(select(selectStudents));
  students?: Array<Student>;
  editedStudent?: Student;

  tableActions: Array<TableActions> = ['edit', 'subjects'];

  showSubjectsModal = false;
  showEditModal = false;

  shouldResetFilter = false;

  resetFilter(): void {
    this.shouldResetFilter = !this.shouldResetFilter;
  }

  onNewStudentAction(): void {
    this.editedStudent = {
      neptunCode: '',
      name: '',
      email: '',
      major: '' as Major,
    } as Student;
    this.showEditModal = true;
  }

  onEditClose(): void {
    this.editedStudent = undefined;
    this.showEditModal = false;
    this.store.dispatch(studentsRequestedAction({}));
    this.resetFilter();
  }

  onEditAction(student: Student): void {
    this.editedStudent = student;
    this.showEditModal = true;
  }

  onSubjectsAction(student: Student): void {
    this.editedStudent = student;
    this.showSubjectsModal = true;
  }

  onSubjectsOk(student?: Student): void {
    if (student) {
      this.store.dispatch(studentUpdateAction({ student }));
      this.store.dispatch(studentsRequestedAction({}));
      this.resetFilter();
    }
    this.editedStudent = undefined;
    this.showSubjectsModal = false;
  }

  onFilter(studentFilter: StudentFilter): void {
    this.store.dispatch(studentsRequestedAction({ studentFilter }));
  }
}
