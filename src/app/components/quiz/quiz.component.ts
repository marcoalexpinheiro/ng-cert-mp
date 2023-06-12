import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'app/interfaces/question';
import { Observable } from 'rxjs';
import { EnumDifficulty } from '../../enums/dificulty.enum';
import { EnumAnswersType } from '../../enums/type.enum';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public questions$!: Observable<Question[]>;

  constructor(
    private _route: ActivatedRoute,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      let id: string = params.get('id');
    });

    this.questions$ = this._appService.grabQuizFromAPI({
      category: 12,
      amount: 5,
      difficulty: EnumDifficulty.EASY,
      type: EnumAnswersType.MULTIPLE,
    });
  }
  public setAnswer(answer, $event): void {
    console.log(answer);
  }
}
