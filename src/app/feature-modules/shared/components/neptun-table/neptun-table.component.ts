import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { NzTableSize } from 'ng-zorro-antd/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Column } from 'src/app/models/components/Column';
import { TableActions } from 'src/app/models/enums/TableActions';

@UntilDestroy()
@Component({
  selector: 'app-neptun-table',
  templateUrl: './neptun-table.component.html',
  styleUrls: ['./neptun-table.component.css'],
})
export class NeptunTableComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  @Input() columns!: Array<Column>;
  @Input() items!: Array<any>;
  @Input() size: NzTableSize = 'middle';
  @Input() actions: Array<TableActions> = [];

  @Output() subjectsAction = new EventEmitter();
  @Output() editAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() filterEvent = new EventEmitter();

  filter!: FormGroup;
  showFilter = false;

  ngOnInit(): void {
    this.showFilter = this.columns.some((column) => column.filter);
    this.resetFilter();

    this.filter.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        this.filterEvent.emit(value);
      });
  }

  resetFilter(): void {
    const filterObject: Record<any, string> = {};
    this.columns.forEach((column) => {
      if (column.filter) {
        filterObject[column.filter.value] = '';
      }
    });
    this.filter = this.formBuilder.group(filterObject);
  }

  onSubjects(item: any): void {
    this.subjectsAction.emit(item);
  }

  onEdit(item: any): void {
    this.editAction.emit(item);
  }

  onDelete(item: any): void {
    this.deleteAction.emit(item);
  }
}
