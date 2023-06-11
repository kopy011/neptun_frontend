import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { subjectsRequestedAction } from 'src/app/feature-modules/subjects/store/subjects.actions';
import { selectSubjects } from 'src/app/feature-modules/subjects/store/subjects.selectors';
import {
  teacherUpdateAction,
  teachersRequestedAction,
} from 'src/app/feature-modules/teachers/store/teachers.actions';
import { Semester } from 'src/app/models/Semester';
import { Subject } from 'src/app/models/Subject';
import { Teacher } from 'src/app/models/Teacher';
import { Column } from 'src/app/models/components/Column';

@UntilDestroy()
@Component({
  selector: 'app-subjects-modal',
  templateUrl: './subjects-modal.component.html',
  styleUrls: ['./subjects-modal.component.css'],
})
export class SubjectsModalComponent implements OnInit {
  subjectColumns: Array<Column> = [
    {
      title: 'Félév',
      value: 'semester',
      compare: (a: Subject, b: Subject) =>
        a.semester.name.localeCompare(b.semester.name),
      priority: false,
    },
    {
      title: 'Név',
      value: 'name',
      compare: (a: Subject, b: Subject) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Kód',
      value: 'code',
      compare: (a: Subject, b: Subject) => a.code.localeCompare(b.code),
      priority: false,
    },
    {
      title: 'Kredit',
      value: 'credit',
      compare: (a: Subject, b: Subject) =>
        a.credit.toString().localeCompare(b.credit.toString()),
      priority: false,
    },
    {
      title: 'Tanszék',
      value: 'department',
      compare: (a: Subject, b: Subject) =>
        a.department.localeCompare(b.department),
      priority: false,
    },
  ];

  @Input() show!: boolean;
  @Input() entity!: any;

  @Output() okAction = new EventEmitter();

  dirty = false;

  semesters: Array<Semester> = [];
  allSubjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  selectedSemester: string | number = 'all';

  selectedSubjects: Array<number> = [];
  subjects$ = this.store.pipe(select(selectSubjects));
  allFreeSubjects: Array<Subject> = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dirty = false;
    this.store.dispatch(subjectsRequestedAction({}));

    this.allSubjects = this.entity.subjects;

    this.subjects$.pipe(untilDestroyed(this)).subscribe((subjects) => {
      this.allSubjects.forEach((subject: Subject) => {
        this.allFreeSubjects = subjects.filter(
          (subject) =>
            !this.allSubjects
              .map((subject: Subject) => subject.id)
              .includes(subject.id)
        );
        if (
          !this.semesters
            .map((semester) => semester.id)
            .includes(subject.semester.id)
        ) {
          this.semesters.push(subject.semester);
        }
      });
      this.filteredSubjects = this.allSubjects;
    });
  }

  onOk(): void {
    if (this.dirty) {
      const newEntity = {
        ...this.entity,
        subjects: this.allSubjects,
      };
      this.okAction.emit(newEntity);
    }
    this.okAction.emit();
  }

  onCancel(): void {
    this.okAction.emit();
  }

  onSemesterChanged(selectedSemester: string | number): void {
    if (selectedSemester === 'all') {
      this.filteredSubjects = this.allSubjects;
    } else {
      this.filteredSubjects = this.allSubjects.filter(
        (subject: Subject) => subject.semester.id === selectedSemester
      );
    }
  }

  onSubjectsSave(): void {
    this.dirty = true;
    this.allSubjects = [
      ...this.allSubjects,
      ...this.allFreeSubjects.filter((subject) =>
        this.selectedSubjects.includes(subject.id!)
      ),
    ];
    this.selectedSemester = 'all';
    this.filteredSubjects = this.allSubjects;
    this.selectedSubjects = [];
    this.store.dispatch(subjectsRequestedAction({}));
  }

  onDelete(subject: Subject): void {
    this.dirty = true;
    const newAllSubjects = [...this.allSubjects];
    const subjectToDelete = this.allSubjects.find((s) => s.id === subject.id);
    newAllSubjects.splice(this.allSubjects.indexOf(subjectToDelete!), 1);
    this.allSubjects = newAllSubjects;
    this.selectedSemester = 'all';
    this.filteredSubjects = this.allSubjects;
    this.store.dispatch(subjectsRequestedAction({}));
  }
}
