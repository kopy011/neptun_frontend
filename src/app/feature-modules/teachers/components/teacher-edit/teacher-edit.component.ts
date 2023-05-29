import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Teacher } from 'src/app/models/Teacher';
import { Classification } from 'src/app/models/enums/Classification';
import {
  teacherCreateAction,
  teacherUpdateAction,
  teacherUpdatedAction,
} from '../../store/teachers.actions';

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
      neptunCode: [this.teacher.id ? this.teacher.neptunCode : ''],
      name: [this.teacher.id ? this.teacher.name : ''],
      email: [this.teacher.id ? this.teacher.email : ''],
      classification: [this.teacher.id ? this.teacher.classification : ''],
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
    const teacher: Teacher = this.teacherForm.value;
    if (teacher.id) {
      this.store.dispatch(teacherUpdateAction({ teacher }));
    } else {
      this.store.dispatch(teacherCreateAction({ teacher }));
    }
    this.closeAction.emit();
  }
}
