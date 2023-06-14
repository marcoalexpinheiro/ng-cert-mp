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
  private _nbr: number = 0;

  constructor(private _questionsStore: QuestionsStore) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._questionsStore.getNumberOfQuestionsAnswered().subscribe((nber) => {
      this._nbr = nber;
    });

    return this._nbr === 5 ? true : false;
  }
}
