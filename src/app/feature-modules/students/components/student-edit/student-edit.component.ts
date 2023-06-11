import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Student } from 'src/app/models/Student';
import {
  studentCreateAction,
  studentUpdateAction,
} from '../../store/students.actions';
import { NeptunCodeValidator } from 'src/app/validators/neptunCode.validator';
import { Major } from 'src/app/models/enums/Major';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      id: [this.student.id ? this.student.id : undefined],
      neptunCode: [
        this.student.id ? this.student.neptunCode : '',
        [Validators.required, NeptunCodeValidator()],
      ],
      name: [
        this.student.id ? this.student.name : '',
        [Validators.required, Validators.maxLength(150)],
      ],
      email: [
        this.student.id ? this.student.email : '',
        [Validators.required, Validators.email],
      ],
      major: [this.student.id ? this.student.major : '', [Validators.required]],
    });
  }

  @Input() show!: boolean;
  @Input() student!: Student;

  @Output() closeAction = new EventEmitter();

  studentForm!: FormGroup;
  majors = Object.values(Major);

  onCancel(): void {
    this.closeAction.emit();
  }

  onOk(): void {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      if (student.id) {
        this.store.dispatch(studentUpdateAction({ student }));
      } else {
        this.store.dispatch(studentCreateAction({ student }));
      }
      this.closeAction.emit();
    } else {
      Object.values(this.studentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
