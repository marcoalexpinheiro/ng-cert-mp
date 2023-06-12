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
import { Category } from '../interfaces/catgory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore {
  private _categories = new BehaviorSubject<Category[] | null>(null);

  constructor(private _appService: AppService) {}

  private setupQuizCategories(): void {
    this._appService
      .grabQuizCatsFromAPI()
      .pipe(take(1))
      .subscribe((cats) => {
        this._categories.next(cats);
      });
  }

  public getCategories(): Observable<Category[] | null> {
    if (!this._categories.value) this.setupQuizCategories();
    return this._categories.asObservable().pipe(shareReplay(1));
  }

  public clear(): void {
    this._categories.next(null);
  }

  public complete(): void {
    this._categories.next(null);
    this._categories.complete();
    this._categories = new BehaviorSubject<Category[] | null>(null);
  }
}