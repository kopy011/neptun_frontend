import { NzTableSortFn } from 'ng-zorro-antd/table';
import { FilterTypes } from '../enums/FilterTypes';

export interface OptionProperties {
  label: string;
  value: any;
}

export interface FilterProperties {
  value: string;
  type: FilterTypes;
  options?: Array<OptionProperties>;
}

export interface Column {
  title: string;
  value: string;
  compare: boolean | NzTableSortFn<any> | null;
  filter?: FilterProperties;
  priority: number | boolean;
}
