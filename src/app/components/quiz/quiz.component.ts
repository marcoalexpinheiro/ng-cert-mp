import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumDifficulty } from '../../enums/dificulty.enum';
import { EnumAnswersType } from '../../enums/type.enum';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      let id: string = params.get('id');
    });

    this._appService
      .grabQuizFromAPI({
        category: 12,
        amount: 5,
        difficulty: EnumDifficulty.EASY,
        type: EnumAnswersType.MULTIPLE,
      })
      .subscribe((questions) => {
        console.log(questions);
      });
  }
  public setAnswer(answer, $event): void {
    console.log(answer);
  }
}
