import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  switchMap,
  catchError,
  tap,
  map,
  filter,
  shareReplay,
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
      difficulty: [EnumDifficulty.EASY],
    });

    this.initFormReactions();
    this.setInitialValuesOfQuizFormSetup();
  }

  private setInitialValuesOfQuizFormSetup(): void {
    this._categoriesStore
      .getCurrentDifficulty()
      .pipe(
        take(1),
        filter((difficulty) => !!difficulty)
      )
      .subscribe((difficulty) => {
        this.setupQuizForm.controls['difficulty'].setValue(difficulty);
      });

    this._categoriesStore
      .getCurrentCategory()
      .pipe(
        take(1),
        filter((cat) => !!cat)
      )
      .subscribe((cat) => {
        this.setupQuizForm.controls['category'].setValue(cat);
      });
  }

  private initFormReactions(): void {
    this.categorySelect$ = this.setupQuizForm.controls['category'].valueChanges;
    this._subs.push(
      this.categorySelect$.subscribe((cat: number) => {
        this._categoriesStore.setCurrentCategory(cat);
      })
    );

    this.difficultySelect$ =
      this.setupQuizForm.controls['difficulty'].valueChanges;
    this._subs.push(
      this.difficultySelect$.subscribe((diff: string) => {
        this._categoriesStore.setCurrentDifficulty(diff);
      })
    );
  }

  public startQuizHandler(): void {
    this._questionsStore.clear();

    this._router.navigate(['/quiz']);
    this._questionsStore.getQuestions();
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
