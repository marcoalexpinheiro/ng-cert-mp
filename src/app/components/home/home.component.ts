import { Component, OnInit } from '@angular/core';
import { CategoriesStore } from '../../stores/categories.store';
import { Category } from '../../interfaces/catgory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cats$!: Observable<Category[]>;

  constructor(private _categoriesStore: CategoriesStore) {}

  ngOnInit() {
    this.cats$ = this._categoriesStore.getCategories();
  }
}
