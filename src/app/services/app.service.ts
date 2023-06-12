import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Question } from 'app/interfaces/question';
import { RequestParam } from 'app/interfaces/request-param';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {}

  grabQuizFromAPI(query: RequestParam): Observable<Question[]> {
    const url = `https://opentdb.com/api.php`;
    let params = new HttpParams();
    Object.keys(query).forEach(
      (key) => (params = params.append(key, query[key]))
    );

    return this._http.get<any>(url, { params }).pipe(map((res) => res.results));
  }
}
