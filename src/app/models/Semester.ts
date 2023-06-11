export interface Semester {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface SemesterFilter {
  name?: string;
}
