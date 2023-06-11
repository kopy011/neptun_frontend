import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Semester } from 'src/app/models/Semester';
import { Classification } from 'src/app/models/enums/Classification';
import {
  semesterCreateAction,
  semesterUpdateAction,
} from '../../store/semesters.actions';

@Component({
  selector: 'app-semester-edit',
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.css'],
})
export class SemesterEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.semesterForm = this.formBuilder.group({
      id: [this.semester.id ? this.semester.id : undefined],
      name: [
        this.semester.id ? this.semester.name : '',
        [Validators.required, Validators.maxLength(150)],
      ],
      startDate: [
        this.semester.id ? this.semester.startDate : '',
        [Validators.required],
      ],
      endDate: [
        this.semester.id ? this.semester.endDate : '',
        [Validators.required],
      ],
    });
  }

  @Input() show!: boolean;
  @Input() semester!: Semester;

  @Output() closeAction = new EventEmitter();

  semesterForm!: FormGroup;
  classifications = Object.values(Classification);

  onCancel(): void {
    this.closeAction.emit();
  }

  onOk(): void {
    if (this.semesterForm.valid) {
      const semester: Semester = this.semesterForm.value;
      if (semester.id) {
        this.store.dispatch(semesterUpdateAction({ semester }));
      } else {
        this.store.dispatch(semesterCreateAction({ semester }));
      }
      this.closeAction.emit();
    } else {
      Object.values(this.semesterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
