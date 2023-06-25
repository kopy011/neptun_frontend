import { AfterViewChecked, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './feature-modules/shared/store/shared.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { logoutAction } from './feature-modules/shared/store/shared.actions';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  constructor(private store: Store, private router: Router) {}

  ngAfterViewChecked(): void {
    this.isLoggendIn$
      .pipe(untilDestroyed(this))
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
    //TODO display nav or not wether user is logged in or not
  }

  logout(): void {
    this.store.dispatch(logoutAction());
    this.router.navigate(['login']);
  }

  isLoggedIn = false;
  isLoggendIn$ = this.store.pipe(select(isLoggedIn));

  title = 'neptun-frontend';
}
