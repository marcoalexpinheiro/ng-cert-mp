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
  @Output() answer: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public giveAnswer(option: string): void {
    this.answer.emit(option);
  }
}
