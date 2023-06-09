import { Role } from './enums/Role';

export interface User {
  id: number;
  username: string;
  birthDate: Date;
  department: string;
  password: string;
  roles: Array<Role>;
  teacherId?: number;
  studentId?: number;
}

export interface UserInfo {
  id: number;
  username: string;
  roles?: Array<Role>;
  role?: Role;
}
