import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesStore } from '../../stores/categories.store';
import { Category } from '../../interfaces/catgory';
import { EnumDifficulty } from '../../enums/dificulty.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cats$!: Observable<Category[]>;
  public EnumDifficulty = EnumDifficulty;
  public categorySelect!: number;
  public difficultySelect!: string;
  public setupQuizForm!: FormGroup;

  constructor(
    private _categoriesStore: CategoriesStore,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cats$ = this._categoriesStore.getCategories();
    this.initForm();
    this.setupQuizForm.controls['category'].valueChanges
      .pipe()
      .subscribe((data: any) => console.log(data));
  }

  private initForm(): void {
    this.setupQuizForm = this._formBuilder.group({
      category: [10],
      difficulty: [EnumDifficulty.EASY],
    });
  }
}
