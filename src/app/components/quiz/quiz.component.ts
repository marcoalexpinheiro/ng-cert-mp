import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private _route: ActivatedRoute,
    private _questionsStore: QuestionsStore
  ) {}

  ngOnInit() {
    this.numberOfSubmissions$ =
      this._questionsStore.getNumberOfQuestionsAnswered();

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
}
