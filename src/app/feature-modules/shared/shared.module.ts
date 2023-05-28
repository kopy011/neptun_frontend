import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeptunTableComponent } from './components/neptun-table/neptun-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { FileFill, HomeFill } from '@ant-design/icons-angular/icons';
import { SubjectsModalComponent } from './components/subjects-modal/subjects-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

const icons: IconDefinition[] = [FileFill, HomeFill];

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
  ],
  exports: [
    NeptunTableComponent,
    SubjectsModalComponent,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ],
})
export class SharedModule {}
