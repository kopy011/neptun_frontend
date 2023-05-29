import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableSize } from 'ng-zorro-antd/table';
import { Column } from 'src/app/models/components/Column';
import { TableActions } from 'src/app/models/enums/TableActions';

@Component({
  selector: 'app-neptun-table',
  templateUrl: './neptun-table.component.html',
  styleUrls: ['./neptun-table.component.css'],
})
export class NeptunTableComponent {
  @Input() columns!: Array<Column>;
  @Input() items!: Array<any>;
  @Input() size: NzTableSize = 'middle';
  @Input() actions: Array<TableActions> = [];

  @Output() subjectsAction = new EventEmitter();
  @Output() editAction = new EventEmitter();

  onSubjects(item: any): void {
    this.subjectsAction.emit(item);
  }

  onEdit(item: any): void {
    this.editAction.emit(item);
  }
}
