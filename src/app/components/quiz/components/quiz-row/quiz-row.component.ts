import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Question } from '../../../../interfaces/question';

@Component({
  selector: 'app-quiz-row',
  templateUrl: './quiz-row.component.html',
  styleUrls: ['./quiz-row.component.css'],
})
export class QuizRowComponent implements OnInit {
  @Input() question!: Question;
  @Input() checkAnswers: boolean = false;

  @Output() answer: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() {}

  ngOnInit() {}

  public setNewAnswer(option: string): void {
    this.question.given_answer = option;
    this.answer.emit(this.question);
  }
}
