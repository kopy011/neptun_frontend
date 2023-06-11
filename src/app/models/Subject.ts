import { Semester } from './Semester';

export interface Subject {
  id?: number;
  name: string;
  code: string;
  credit: number;
  department: string;
  semester: Semester;
}

export interface SubjectFilter {
  name?: string;
  code?: string;
  credit?: number;
  department?: string;
  'semester.name'?: string;
}
