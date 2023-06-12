import { Injectable } from '@angular/core';
import { Question } from 'app/interfaces/question';
import { Observable, of, EMPTY, throwError, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, tap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  protected _entity = this.getInitialState();

  protected constructor() {}

  public get(): Observable<Question[] | null> {
    return this._entity.asObservable().pipe(shareReplay(1));
  }

  public clear(): void {
    this._entity.next(null);
  }

  public complete(): void {
    this.clear();
    this._entity.complete();
    this._entity = this.getInitialState();
  }

  protected getInitialState(): BehaviorSubject<Question[] | null> {
    return new BehaviorSubject<Question[] | null>(null);
  }
}
