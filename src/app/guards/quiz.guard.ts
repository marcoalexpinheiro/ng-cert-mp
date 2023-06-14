import { Injectable } from '@angular/core';
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

@Injectable()
export class QuizGuard implements CanActivate {
  private _nbr: number = 0;
  private _diff: string = null;

  constructor(
    private _questionsStore: QuestionsStore,
    private _categoriesStore: CategoriesStore
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

    return this._nbr >= 0 && this._diff ? true : false;
  }
}
