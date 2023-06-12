import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../interfaces/question';
import { QuestionsStore } from '../../stores/questions.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public questions$!: Observable<Question[]>;
  public checkAnswers = false;

  constructor(
    private _route: ActivatedRoute,
    private _questionsStore: QuestionsStore
  ) {
    //this._questionsStore.setupQuizQuestions();
  }

  ngOnInit() {
    this.questions$ = this._questionsStore.getQuestions();
  }
  public setAnswer($event): void {
    this._questionsStore.updateQuestion($event);
  }
}
