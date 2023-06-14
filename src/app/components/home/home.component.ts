import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {
  switchMap,
  catchError,
  startWith,
  tap,
  map,
  filter,
  shareReplay,
  withLatestFrom,
  take,
} from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoriesStore } from '../../stores/categories.store';
import { EnumDifficulty } from '../../enums/dificulty.enum';
import { QuestionsStore } from '../../stores/questions.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private _subs: Subscription[] = [];

  public cats$!: Observable<Category[]>;
  public EnumDifficulty = EnumDifficulty;
  public categorySelect$!: Observable<number>;
  public difficultySelect$!: Observable<string>;
  public setupQuizForm!: FormGroup;

  private _formReactions$!: Observable<any>;

  constructor(
    private _categoriesStore: CategoriesStore,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _questionsStore: QuestionsStore
  ) {}

  ngOnInit() {
    this.cats$ = this._categoriesStore.getCategories();
    this.initForm();
  }

  private initForm(): void {
    this.setupQuizForm = this._formBuilder.group({
      category: null,
      difficulty: null,
    });

    this.setInitialValuesOfQuizFormSetup();
    this.initFormReactions();
  }

  private setInitialValuesOfQuizFormSetup(): void {
    this._categoriesStore
      .getCurrentDifficulty()
      .pipe(
        withLatestFrom(this._categoriesStore.getCurrentCategory()),
        filter(([difficulty, category]) => !!difficulty && !!category),
        take(1)
      )
      .subscribe(([difficulty, category]) => {
        this.setupQuizForm.controls['difficulty'].setValue(difficulty);
        this.setupQuizForm.controls['category'].setValue(category);
      });
  }

  private initFormReactions(): void {
    this._subs.push(
      combineLatest([
        this.setupQuizForm.controls['category'].valueChanges.pipe(
          startWith(this.setupQuizForm.controls['category'].value)
        ),
        this.setupQuizForm.controls['difficulty'].valueChanges.pipe(
          startWith(this.setupQuizForm.controls['difficulty'].value)
        ),
      ]).subscribe(([cat, dif]) => {
        this._categoriesStore.setCurrentCategory(cat);
        this._categoriesStore.setCurrentDifficulty(dif);
      })
    );
  }

  public startQuizHandler(): void {
    this._questionsStore.clear();
    this._questionsStore.getQuestions();
    this._router.navigate(['/quiz']);
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
