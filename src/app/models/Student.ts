import { Subject } from './Subject';
import { Major } from './enums/Major';

export interface Student {
  id?: number;
  neptunCode: string;
  name: string;
  email: string;
  major: Major;
  subjects: Array<Subject>;
}

export interface StudentFilter {
  neptunCode?: string;
  name?: string;
  email?: string;
  major?: Major;
}
