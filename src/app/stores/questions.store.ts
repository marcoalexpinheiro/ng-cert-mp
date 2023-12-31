import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { AppService } from '../services/app.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  map,
  shareReplay,
  take,
  withLatestFrom,
  filter,
  switchMap,
} from 'rxjs/operators';
import { EnumAnswersType } from '../enums/type.enum';

import { NUMBER_OF_QUESTIONS } from '../assets/constants/misc.contants';
import { CategoriesStore } from '../stores/categories.store';

@Injectable({
  providedIn: 'root',
})
export class QuestionsStore {
  private _questions = new BehaviorSubject<Question[] | null>(null);

  constructor(
    private _appService: AppService,
    private _categoriesStore: CategoriesStore
  ) {}

  private setupQuizQuestions(): void {
    this._categoriesStore
      .getCurrentDifficulty()
      .pipe(
        withLatestFrom(this._categoriesStore.getCurrentCategory()),
        filter(([difficulty, category]) => !!difficulty && !!category),
        switchMap(([difficulty, category]) =>
          this._appService.grabQuizFromAPI({
            category: category,
            amount: NUMBER_OF_QUESTIONS,
            difficulty: difficulty,
            type: EnumAnswersType.MULTIPLE,
          })
        ),
        take(1)
      )
      .subscribe((questions) => {
        this._questions.next(questions);
      });
  }

  public updateQuestion(question: Question): void {
    let questions = this._questions.value;
    questions?.forEach((q, index) => {
      if (q.question === question.question) {
        questions[index] = question;
        this._questions.next(questions);
      }
    });
  }

  public getNumberOfQuestionsAnswered(): Observable<number> {
    return this._questions.asObservable().pipe(
      map((questions: Question[]) =>
        questions?.filter((q: Question) => q.given_answer !== undefined)
      ),
      map((answeredQuestions: Question[]) => answeredQuestions?.length ?? 0)
    );
  }

  public getNumberOfCorrectQuestionsAnswered(): Observable<number> {
    return this._questions.asObservable().pipe(
      map((questions: Question[]) =>
        questions?.filter((q: Question) => q.correct_answer === q.given_answer)
      ),
      map((answeredQuestions: Question[]) => answeredQuestions?.length ?? 0)
    );
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
