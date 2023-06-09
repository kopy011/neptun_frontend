import { NzTableSortFn } from 'ng-zorro-antd/table';

export interface FilterProperties {
  value: string;
}

export interface Column {
  title: string;
  value: string;
  compare: boolean | NzTableSortFn<any> | null;
  filter?: FilterProperties;
  priority: number | boolean;
}
