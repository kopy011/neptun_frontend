import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { semestersRequestedAction } from '../../store/semesters.actions';
import { selectSemesters } from '../../store/semesters.selectors';
import { Semester, SemesterFilter } from 'src/app/models/Semester';
import { Column } from 'src/app/models/components/Column';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableActions } from 'src/app/models/enums/TableActions';
import { distinctUntilChanged } from 'rxjs';
import { isAdmin } from 'src/app/feature-modules/shared/store/shared.selectors';

@UntilDestroy()
@Component({
  selector: 'app-semester-layout',
  templateUrl: './semester-layout.component.html',
  styleUrls: ['./semester-layout.component.css'],
})
export class SemesterLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  semesterColumns: Array<Column> = [
    {
      title: 'Name',
      value: 'name',
      compare: (a: Semester, b: Semester) => a.name.localeCompare(b.name),
      filter: {
        value: 'name',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Kezdő dátum',
      value: 'startDate',
      compare: (a: Semester, b: Semester) =>
        a.startDate.toDateString().localeCompare(b.startDate.toDateString()),
      filter: {
        value: 'startDate',
        type: 'text',
      },
      priority: false,
    },
    {
      title: 'Vég dátum',
      value: 'endDate',
      compare: (a: Semester, b: Semester) =>
        a.endDate.toDateString().localeCompare(b.endDate.toDateString()),
      filter: {
        value: 'endDate',
        type: 'text',
      },
      priority: false,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(semestersRequestedAction({}));

    this.semesters$.pipe(untilDestroyed(this)).subscribe((semesters) => {
      this.semesters = semesters;
    });

    this.isAdmin$
      .pipe(untilDestroyed(this))
      .subscribe((isAdmin) => (this.isAdmin = isAdmin));
  }

  semesters$ = this.store.pipe(select(selectSemesters));
  semesters?: Array<Semester>;
  editedSemester?: Semester;

  isAdmin$ = this.store.pipe(select(isAdmin));
  isAdmin = false;

  tableActions: Array<TableActions> = ['edit'];

  showEditModal = false;

  onNewSemesterAction(): void {
    this.editedSemester = {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    } as Semester;
    this.showEditModal = true;
  }

  onEditClose(): void {
    this.editedSemester = undefined;
    this.showEditModal = false;
    this.store.dispatch(semestersRequestedAction({}));
  }

  onEditAction(semester: Semester): void {
    this.editedSemester = semester;
    this.showEditModal = true;
  }

  onFilter(semesterFilter: SemesterFilter): void {
    this.store.dispatch(semestersRequestedAction({ semesterFilter }));
  }
}
