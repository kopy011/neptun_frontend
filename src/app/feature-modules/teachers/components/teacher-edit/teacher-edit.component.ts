import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Teacher } from 'src/app/models/Teacher';
import { Classification } from 'src/app/models/enums/Classification';
import {
  teacherCreateAction,
  teacherUpdateAction,
  teacherUpdatedAction,
} from '../../store/teachers.actions';
import { NeptunCodeValidator } from 'src/app/validators/neptunCode.validator';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css'],
})
export class TeacherEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      id: [this.teacher.id ? this.teacher.id : undefined],
      neptunCode: [
        this.teacher.id ? this.teacher.neptunCode : '',
        [Validators.required, NeptunCodeValidator()],
      ],
      name: [
        this.teacher.id ? this.teacher.name : '',
        [Validators.required, Validators.maxLength(150)],
      ],
      email: [
        this.teacher.id ? this.teacher.email : '',
        [Validators.required, Validators.email],
      ],
      classification: [
        this.teacher.id ? this.teacher.classification : '',
        [Validators.required],
      ],
    });
  }

  @Input() show!: boolean;
  @Input() teacher!: Teacher;

  @Output() closeAction = new EventEmitter();

  teacherForm!: FormGroup;
  classifications = Object.values(Classification);

  onCancel(): void {
    this.closeAction.emit();
  }

  onOk(): void {
    if (this.teacherForm.valid) {
      const teacher: Teacher = this.teacherForm.value;
      if (teacher.id) {
        this.store.dispatch(teacherUpdateAction({ teacher }));
      } else {
        this.store.dispatch(teacherCreateAction({ teacher }));
      }
      this.closeAction.emit();
    } else {
      Object.values(this.teacherForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
