import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'src/app/models/Subject';
import { Classification } from 'src/app/models/enums/Classification';
import {
  subjectCreateAction,
  subjectUpdateAction,
} from '../../store/subjects.actions';
import { Semester } from 'src/app/models/Semester';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css'],
})
export class SubjectEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      id: [this.subject.id ? this.subject.id : undefined],
      name: [
        this.subject.id ? this.subject.name : '',
        [Validators.required, Validators.maxLength(150)],
      ],
      code: [
        this.subject.id ? this.subject.code : '',
        [Validators.required, Validators.maxLength(20)],
      ],
      credit: [
        this.subject.id ? this.subject.credit : 0,
        [Validators.required, Validators.min(0)],
      ],
      department: [
        this.subject.id ? this.subject.department : '',
        [Validators.required, Validators.maxLength(150)],
      ],
      semester: [
        this.subject.id ? this.subject.semester : this.semesters[0],
        [Validators.required],
      ],
    });
  }

  @Input() show!: boolean;
  @Input() subject!: Subject;
  @Input() semesters!: Array<Semester>;

  @Output() closeAction = new EventEmitter();

  subjectForm!: FormGroup;
  classifications = Object.values(Classification);

  onCancel(): void {
    this.closeAction.emit();
  }

  onOk(): void {
    if (this.subjectForm.valid) {
      const subject: Subject = this.subjectForm.value;
      if (subject.id) {
        this.store.dispatch(subjectUpdateAction({ subject }));
      } else {
        this.store.dispatch(subjectCreateAction({ subject }));
      }
      this.closeAction.emit();
    } else {
      Object.values(this.subjectForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  compareSemesters = (semester1: Semester, semester2: Semester) =>
    semester1 && semester2
      ? semester1.id === semester2.id
      : semester1 === semester2;
}
