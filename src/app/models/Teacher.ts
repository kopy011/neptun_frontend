import { Subject } from './Subject';
import { Classification } from './enums/Classification';

export interface Teacher {
  id?: number;
  neptunCode: string;
  name: string;
  email: string;
  classification: Classification;
  subjects: Array<Subject>;
}

export interface TeacherFilter {
  neptunCode?: string;
  name?: string;
  eamil?: string;
  classification?: Classification;
}
