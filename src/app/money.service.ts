import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class MoneyService {

  private url = 'https://api.apilayer.com/exchangerates_data/convert';
  private apiKey = '7dtQfBZ6k55krF3VtzVZUWQLQUpF9yLY';

  httpOptions = {
    headers: new HttpHeaders({ 'apikey': this.apiKey })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  /** GET hero by id. Return `undefined` when id not found */
  getCurrency(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.url}?to=${to}&from=${from}&amount=${amount}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`error`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/