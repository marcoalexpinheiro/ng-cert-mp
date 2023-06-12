import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { AppService } from '../services/app.service';
import { Observable, of, EMPTY, throwError, BehaviorSubject } from 'rxjs';
import {
  switchMap,
  catchError,
  tap,
  map,
  shareReplay,
  take,
} from 'rxjs/operators';
import { EnumAnswersType } from '../enums/type.enum';
import { EnumDifficulty } from '../enums/dificulty.enum';

@Injectable({
  providedIn: 'root',
})
export class QuestionsStore {
  private _questions = new BehaviorSubject<Question[] | null>(null);

  constructor(private _appService: AppService) {}

  private setupQuizQuestions(cat: number = 12, amount: number = 5): void {
    this._appService
      .grabQuizFromAPI({
        category: cat,
        amount: 5,
        difficulty: EnumDifficulty.EASY,
        type: EnumAnswersType.MULTIPLE,
      })
      .pipe(take(1))
      .subscribe((questions) => {
        this._questions.next(questions);
      });
  }

  public getQuestions(): Observable<Question[] | null> {
    if (!this._questions.value) this.setupQuizQuestions();
    return this._questions.asObservable().pipe(shareReplay(1));
  }

  public update(entity: Question[] | null): void {
    this._questions.next(entity);
  }

  public clear(): void {
    this._questions.next(null);
  }

  public complete(): void {
    this._questions.next(null);
    this._questions.complete();
    this._questions = new BehaviorSubject<Question[] | null>(null);
  }
}
