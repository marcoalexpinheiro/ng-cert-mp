import { Injectable } from '@angular/core';
import { QuestionsStore } from '../stores/questions.store';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ResultsGuard implements CanActivate {
  private _numberOfSubmissions$!: Observable<number>;

  constructor(private _questionsStore: QuestionsStore) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;

    this._questionsStore.getNumberOfQuestionsAnswered().subscribe((nber) => {
      return nber === 5 ? true : false;
    });
  }
}
