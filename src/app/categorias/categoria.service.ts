import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Categoria } from './categoria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YWRtaW5AdGVzdGUuY29tOmFkbWlu' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'http://localhost:8080/categorias';

  constructor( private http: HttpClient ) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl, httpOptions)
      .toPromise();
  }

  pesquisar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl, httpOptions)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('pesquisar', []))
      );
  }

  private log(message: string) {
    console.log(message);
  }

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

}
