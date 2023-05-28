import { NzTableSortFn } from 'ng-zorro-antd/table';

export interface Column {
  title: string;
  value: string;
  compare: boolean | NzTableSortFn<any> | null;
  priority: number | boolean;
}
