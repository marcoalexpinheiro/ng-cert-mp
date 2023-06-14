import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesStore } from '../../stores/categories.store';
import { Category } from '../../interfaces/catgory';
import { EnumDifficulty } from '../../enums/dificulty.enum';

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
    private _router: Router
  ) {}

  ngOnInit() {
    this.cats$ = this._categoriesStore.getCategories();
    this.initForm();
    this.initObservales();
  }

  public startQuizHandler(): void {
    this._router.navigate(['/quiz']);
  }

  private initObservales(): void {
    this.categorySelect$ =
      this.setupQuizForm.controls['category'].valueChanges.pipe();

    this.difficultySelect$ =
      this.setupQuizForm.controls['difficulty'].valueChanges.pipe();

    this._subs.push(
      this.categorySelect$.subscribe((data: any) => console.log(data))
    );
    this._subs.push(
      this.difficultySelect$.subscribe((data: any) => console.log(data))
    );
  }
  private initForm(): void {
    this.setupQuizForm = this._formBuilder.group({
      category: [10],
      difficulty: [EnumDifficulty.EASY],
    });
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
