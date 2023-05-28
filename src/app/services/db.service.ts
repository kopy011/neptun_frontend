import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Semester } from '../models/Semester';
import * as dayjs from 'dayjs';
import { Teacher } from '../models/Teacher';
import { Subject } from '../models/Subject';
import { Classification } from '../models/enums/Classification';
import { Student } from '../models/Student';
import { Major } from '../models/enums/Major';

@Injectable({
  providedIn: 'root',
})
export class DbService implements InMemoryDbService {
  constructor() {}

  sem_2022_2203_1: Semester = {
    id: 1,
    name: '2022-2023/1',
    startDate: dayjs('2022-09-15').toDate(),
    endDate: dayjs('2023-01-30').toDate(),
  };

  sem_2022_2203_2: Semester = {
    id: 2,
    name: '2022-2023/2',
    startDate: dayjs('2023-02-10').toDate(),
    endDate: dayjs('2023-06-30').toDate(),
  };

  DI_MAT: Subject = {
    id: 1,
    name: 'Diszkrét Matematika',
    code: 'DIMAT22231PE',
    credit: 4,
    department: 'MATH',
    semester: this.sem_2022_2203_1,
  };

  ILA: Subject = {
    id: 2,
    name: 'Informatika logika és algoritmitkai alapjai',
    code: 'ILA22232PE',
    credit: 5,
    department: 'MATH',
    semester: this.sem_2022_2203_2,
  };

  TESI_1: Subject = {
    id: 3,
    name: 'Testnevelés 1',
    code: 'TE22231PE',
    credit: 0,
    department: 'TESI',
    semester: this.sem_2022_2203_1,
  };

  createDb() {
    return {
      teachers: [
        {
          id: 1,
          neptunCode: 'SZALKAI',
          name: 'Dr. Szalkai',
          email: 'szalkai@mik.uni-pannon.hu',
          classification: Classification.DOCENS,
          subjects: [this.DI_MAT, this.ILA],
        },
        {
          id: 2,
          neptunCode: 'TESITAN',
          name: 'Dr. Tesitanár',
          email: 'tesit@tes.uni-pannon.hu',
          classification: Classification.UGYVIVO_SZAKERTO,
          subjects: [this.TESI_1],
        },
      ] as Array<Teacher>,
      students: [
        {
          id: 1,
          name: 'Okos Tag',
          neptunCode: 'SMARTBO',
          email: 'smart@boi.com',
          major: Major.PROG_BSC,
          subjects: [this.DI_MAT, this.ILA],
        },
        {
          id: 2,
          name: 'Sportos de Okos Tag',
          neptunCode: 'SBSMBO',
          email: 'smart.strong@boi.com',
          major: Major.MERNOK_BSC,
          subjects: [this.DI_MAT, this.TESI_1],
        },
      ] as Array<Student>,
      subjects: [this.DI_MAT, this.ILA, this.TESI_1] as Array<Subject>,
      semesters: [
        this.sem_2022_2203_1,
        this.sem_2022_2203_2,
      ] as Array<Semester>,
    };
  }
}
