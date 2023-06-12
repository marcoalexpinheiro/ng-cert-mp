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
  @Output() answer: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  ngOnInit() {}

  public giveAnswer(answer: string): void {
    this.question.given_answer = answer;
    this.answer.emit(this.question);
  }
}
