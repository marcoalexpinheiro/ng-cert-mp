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
import { CategoriesStore } from '../../stores/categories.store';
import { Category } from '../interfaces/category';
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
    this.initObservales();
    this.initQuizFormSetup();
  }

  public startQuizHandler(): void {
    this._router.navigate(['/quiz']);
  }

  private initQuizFormSetup(): void {
    this._categoriesStore
      .getCurrentDifficulty()
      .pipe(take(1))
      .subscribe((difficulty) => {
        this.setupQuizForm.controls['difficulty'].setValue(difficulty);
      });

    this._categoriesStore
      .getCurrentCategory()
      .pipe(take(1))
      .subscribe((cat) => {
        this.setupQuizForm.controls['category'].setValue(cat);
      });
  }

  private initObservales(): void {
    this.categorySelect$ =
      this.setupQuizForm.controls['category'].valueChanges.pipe();
    this._subs.push(
      this.categorySelect$.subscribe((data: any) => {
        this._questionsStore.clear();
        this._categoriesStore.setCurrentCategory(data);
      })
    );

    this.difficultySelect$ =
      this.setupQuizForm.controls['difficulty'].valueChanges.pipe();
    this._subs.push(
      this.difficultySelect$.subscribe((data: any) => {
        this._questionsStore.clear();
        this._categoriesStore.setCurrentDifficulty(data);
      })
    );
  }

  private initForm(): void {
    this.setupQuizForm = this._formBuilder.group({
      category: null,
      difficulty: [EnumDifficulty.EASY],
    });
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
