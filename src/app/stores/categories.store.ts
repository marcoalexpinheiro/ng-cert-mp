import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { AppService } from '../services/app.service';
import { Observable, of, EMPTY, throwError, BehaviorSubject } from 'rxjs';
import {
  switchMap,
  catchError,
  tap,
  map,
  filter,
  shareReplay,
  take,
} from 'rxjs/operators';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore {
  private _categories$ = new BehaviorSubject<Category[] | null>(null);
  private _currentCategory$ = new BehaviorSubject<number | null>(null);
  private _currentDifficulty$ = new BehaviorSubject<string | null>(null);

  constructor(private _appService: AppService) {}

  private setupQuizCategories(): void {
    this._appService
      .grabQuizCatsFromAPI()
      .pipe(take(1))
      .subscribe((cats) => {
        this._categories$.next(cats);
      });
  }

  public getCategories(): Observable<Category[] | null> {
    if (!this._categories$.value) this.setupQuizCategories();
    return this._categories$.asObservable().pipe(shareReplay(1));
  }

  public getCurrentCategory(): Observable<number> {
    return this._currentCategory$.asObservable();
  }

  public setCurrentCategory(cat: number): void {
    this._currentCategory$.next(cat);
  }

  public getCurrentDifficulty(): Observable<string> {
    return this._currentDifficulty$.asObservable();
  }

  public setCurrentDifficulty(difficulty: string): void {
    this._currentDifficulty$.next(difficulty);
  }

  public clear(): void {
    this._categories$.next(null);
    this._currentCategory$.next(null);
    this._currentDifficulty$.next(null);
  }

  public complete(): void {
    this._categories$.next(null);
    this._categories$.complete();
    this._categories$ = new BehaviorSubject<Category[] | null>(null);

    this._currentCategory$.next(null);
    this._currentCategory$.complete();
    this._currentCategory$ = new BehaviorSubject<number | null>(null);

    this._currentDifficulty$.next(null);
    this._currentDifficulty$.complete();
    this._currentDifficulty$ = new BehaviorSubject<string | null>(null);
  }
}
