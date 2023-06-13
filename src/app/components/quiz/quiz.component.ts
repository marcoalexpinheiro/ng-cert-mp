import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../interfaces/question';
import { QuestionsStore } from '../../stores/questions.store';
import { Observable } from 'rxjs';
import {
  switchMap,
  catchError,
  tap,
  map,
  shareReplay,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public questions$!: Observable<Question[]>;
  public checkAnswers = false;
  public numberOfSubmissions$!: Observable<number>;
  public numberOfCorrectSubmissions$!: Observable<number>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionsStore: QuestionsStore
  ) {}

  ngOnInit() {
    this.numberOfSubmissions$ =
      this._questionsStore.getNumberOfQuestionsAnswered();

    this.numberOfCorrectSubmissions$ =
      this._questionsStore.getNumberOfCorrectQuestionsAnswered();

    this.questions$ = this._questionsStore.getQuestions();

    this._route.url.subscribe((event) => {
      if (event[1]?.path === 'results') {
        this.checkAnswers = true;
      }
    });
  }
  public setAnswer($event): void {
    this._questionsStore.updateQuestion($event);
  }

  public createNewQuizHandler(): void {
    this._questionsStore.clear();
    this._router.navigate(['/']);
  }
}
