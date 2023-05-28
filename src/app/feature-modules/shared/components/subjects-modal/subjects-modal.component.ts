import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Semester } from 'src/app/models/Semester';
import { Subject } from 'src/app/models/Subject';
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

  semesters: Array<Semester> = [];
  filteredSubjects: Array<Subject> = [];
  selectedSemester: string | number = 'all';

  constructor() {}

  ngOnInit(): void {
    this.entity.subjects?.forEach((subject: Subject) =>
      !this.semesters.some((semester: Semester) => semester.id === subject.id)
        ? this.semesters.push(subject.semester)
        : undefined
    );
    this.filteredSubjects = this.entity?.subjects;
  }

  onOk(): void {
    this.okAction.emit();
  }

  onSemesterChanged(selectedSemester: string | number) {
    if (selectedSemester === 'all') {
      this.filteredSubjects = this.entity.subjects;
    } else {
      this.filteredSubjects = this.entity.subjects.filter(
        (subject: Subject) => subject.semester.id === selectedSemester
      );
    }
  }
}
