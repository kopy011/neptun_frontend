import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { subjectsRequestedAction } from '../../store/subjects.actions';
import { selectSubjects } from '../../store/subjects.selectors';
import { Subject, SubjectFilter } from 'src/app/models/Subject';
import { Column } from 'src/app/models/components/Column';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableActions } from 'src/app/models/enums/TableActions';
import { distinctUntilChanged } from 'rxjs';
import { selectSemesters } from 'src/app/feature-modules/semesters/store/semesters.selectors';
import { Semester } from 'src/app/models/Semester';
import { semestersRequestedAction } from 'src/app/feature-modules/semesters/store/semesters.actions';

@UntilDestroy()
@Component({
  selector: 'app-subject-layout',
  templateUrl: './subject-layout.component.html',
  styleUrls: ['./subject-layout.component.css'],
})
export class SubjectLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  subjects$ = this.store.pipe(select(selectSubjects));
  subjects?: Array<Subject>;
  editedSubject?: Subject;

  semesters$ = this.store.pipe(select(selectSemesters));
  semesters: Array<Semester> = [];

  tableActions: Array<TableActions> = ['edit'];
  subjectColumns: Array<Column> = [
    {
      title: 'Név',
      value: 'name',
      compare: (a: Subject, b: Subject) => a.name.localeCompare(b.name),
      filter: {
        value: 'name',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Kód',
      value: 'code',
      compare: (a: Subject, b: Subject) => a.code.localeCompare(b.code),
      filter: {
        value: 'code',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Kredit',
      value: 'credit',
      compare: (a: Subject, b: Subject) =>
        a.credit.toString().localeCompare(b.credit.toString()),
      filter: {
        value: 'credit',
        type: 'number',
      },
      priority: false,
    },
    {
      title: 'Tanszék',
      value: 'department',
      compare: (a: Subject, b: Subject) =>
        a.department.localeCompare(b.department),
      filter: {
        value: 'department',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Félév',
      value: 'semester',
      compare: (a: Subject, b: Subject) =>
        a.semester.name.localeCompare(b.semester.name),
      filter: {
        value: 'semester.name',
        type: 'select',
      },
      priority: false,
    },
  ];

  showEditModal = false;

  ngOnInit(): void {
    this.store.dispatch(subjectsRequestedAction({}));
    this.store.dispatch(semestersRequestedAction({}));

    this.subjects$
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((subjects) => {
        this.subjects = subjects;
      });

    this.semesters$
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((semesters) => {
        this.semesters = semesters;
        this.subjectColumns[4].filter!.options = semesters.map((semester) => ({
          label: semester.name,
          value: semester.name,
        }));
      });
  }

  onNewSubjectAction(): void {
    this.editedSubject = {
      name: '',
      code: '',
      credit: 0,
      department: '',
      semester: this.semesters.length > 0 ? this.semesters[0] : undefined,
    } as Subject;
    this.showEditModal = true;
  }

  onEditClose(): void {
    this.editedSubject = undefined;
    this.showEditModal = false;
    this.store.dispatch(subjectsRequestedAction({}));
  }

  onEditAction(subject: Subject): void {
    this.editedSubject = subject;
    this.showEditModal = true;
  }

  onFilter(subjectFilter: SubjectFilter): void {
    this.store.dispatch(subjectsRequestedAction({ subjectFilter }));
  }
}
