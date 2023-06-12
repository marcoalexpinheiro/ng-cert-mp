import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  API_ENDPOINT,
  API_CAT_ENDPOINT,
} from '../assets/constants/misc.contants';
import { Question } from '../../interfaces/question';
import { RequestParam } from '../../interfaces/request-param';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {}

  public grabQuizFromAPI(query: RequestParam): Observable<Question[]> {
    let params = new HttpParams();
    Object.keys(query).forEach(
      (key) => (params = params.append(key, query[key]))
    );

    return this._http.get<any>(API_ENDPOINT, { params }).pipe(
      map((res) => res.results),
      map((questions) => {
        questions.map((question) => {
          question.incorrect_answers.push(question.correct_answer);
          question.incorrect_answers = this.shuffle(question.incorrect_answers);
          return question;
        });
        return questions;
      })
    );
  }

  public grabQuizCatsFromAPI(): Observable<any[]> {
    return this._http
      .get<any>(API_CAT_ENDPOINT)
      .pipe(map((res) => res.trivia_categories));
  }

  private shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
}
