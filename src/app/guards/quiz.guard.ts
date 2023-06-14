import { Injectable, NgZone } from '@angular/core';
import { QuestionsStore } from '../stores/questions.store';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { withLatestFrom, take } from 'rxjs/operators';
import { CategoriesStore } from '../stores/categories.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class QuizGuard implements CanActivate {
  private _nbr: number = 0;
  private _cat: number = null;
  private _diff: string = null;
  private _beingChecked: boolean = false;

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
      .pipe(
        withLatestFrom(
          this._categoriesStore.getCurrentDifficulty(),
          this._categoriesStore.getCurrentCategory(),
          this._questionsStore.getQuestionsAreBeingChecked()
        ),
        take(1)
      )
      .subscribe(([nber, difficulty, category, beingChecked]) => {
        this._nbr = nber;
        this._diff = difficulty;
        this._cat = category;
        this._beingChecked = beingChecked;

        if (!this._diff || !this._cat) {
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'bottom';
          config.horizontalPosition = 'center';
          config.duration = 2000;

          this._zone.run(() => {
            this._snackbar.open(
              'Config. the Quiz selecting a Category and difficulty!',
              'x',
              config
            );
          });
        }
      });

    return (this._nbr > 0 && !this._beingChecked) ||
      (this._diff && this._cat && !this._beingChecked)
      ? true
      : false;
  }
}
