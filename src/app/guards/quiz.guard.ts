import { Injectable, NgZone } from '@angular/core';
import { QuestionsStore } from '../stores/questions.store';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  switchMap,
  catchError,
  tap,
  map,
  filter,
  shareReplay,
  take,
} from 'rxjs/operators';
import { CategoriesStore } from '../stores/categories.store';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
} from '@angular/material';

@Injectable()
export class QuizGuard implements CanActivate {
  private _nbr: number = 0;
  private _diff: string = null;

  constructor(
    private _questionsStore: QuestionsStore,
    private _categoriesStore: CategoriesStore,
    private _snackbar: MatSnackBar,
    private _zone: NgZone
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._questionsStore
      .getNumberOfQuestionsAnswered()
      .pipe(take(1))
      .subscribe((nber) => {
        this._nbr = nber;
      });

    this._categoriesStore
      .getCurrentDifficulty()
      .pipe(take(1))
      .subscribe((difficulty) => {
        this._diff = difficulty;
      });

    if (!(this._nbr >= 0 && this._diff)) {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      this._zone.run(() => {
        this._snackbar.open(
          'Please config. the quiz selecting a Category and difficulty!',
          'x',
          config
        );
      });
    }

    return this._nbr >= 0 && this._diff ? true : false;
  }
}
