import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeptunTableComponent } from './components/neptun-table/neptun-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FileFill,
  HomeFill,
  PlusOutline,
  EditFill,
  DeleteFill,
  SearchOutline,
  CloseOutline,
} from '@ant-design/icons-angular/icons';
import { SubjectsModalComponent } from './components/subjects-modal/subjects-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const icons: IconDefinition[] = [
  FileFill,
  HomeFill,
  PlusOutline,
  EditFill,
  DeleteFill,
  SearchOutline,
  CloseOutline,
];

@NgModule({
  declarations: [NeptunTableComponent, SubjectsModalComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzModalModule,
    NzLayoutModule,
    NzSelectModule,
    FormsModule,
    NzToolTipModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTypographyModule,
    NzGridModule,
    NzDropDownModule,
    NzSpaceModule,
    NzPopconfirmModule,
    NzDatePickerModule,
  ],
  exports: [
    NeptunTableComponent,
    SubjectsModalComponent,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
    NzToolTipModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzTypographyModule,
    NzGridModule,
    NzDatePickerModule,
  ],
})
export class SharedModule {}
