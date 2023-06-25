import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { NzTableSize } from 'ng-zorro-antd/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Column } from 'src/app/models/components/Column';
import { TableActions } from 'src/app/models/enums/TableActions';
import { isAdmin } from '../../store/shared.selectors';

@UntilDestroy()
@Component({
  selector: 'app-neptun-table',
  templateUrl: './neptun-table.component.html',
  styleUrls: ['./neptun-table.component.css'],
})
export class NeptunTableComponent implements OnInit, OnChanges {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  @Input() columns!: Array<Column>;
  @Input() items!: Array<any>;
  @Input() size: NzTableSize = 'middle';
  @Input() actions: Array<TableActions> = [];
  @Input() shouldResetFilter!: boolean;

  @Output() subjectsAction = new EventEmitter();
  @Output() editAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() filterEvent = new EventEmitter();

  filter!: FormGroup;
  showFilter = false;

  isAdmin$ = this.store.pipe(select(isAdmin));
  isAdmin = false;

  ngOnInit(): void {
    this.showFilter = this.columns.some((column) => column.filter);
    this.resetFilter();

    this.filter.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300))
      .subscribe((value: any) => {
        this.filterEvent.emit(value);
      });

    this.isAdmin$
      .pipe(untilDestroyed(this))
      .subscribe((isAdmin) => (this.isAdmin = isAdmin));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shouldResetFilter']) {
      this.resetFilter();
    }
  }

  resetFilter(): void {
    const filterObject: Record<any, any> = {};
    this.columns.forEach((column) => {
      if (column.filter) {
        filterObject[column.filter.value] = undefined;
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
