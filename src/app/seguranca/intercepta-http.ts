import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable, from as observableFromPromise } from 'rxjs';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class InterceptaHttp extends HttpClient {

  constructor(
    private auth: AuthService,
    private httpHandler: HttpHandler
  ) {
    super(httpHandler);
  }

  public get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  public post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  public put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  public patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
  }

  public head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  public options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  private fazerRequisicao<T>(fn: Function): Observable<T> {
    if (this.auth.tokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      const refreshToken = this.auth.refreshToken()
        .then(() => {
          if (this.auth.tokenInvalido()) {
            throw new NotAuthenticatedError();
          }

          return fn().toPromise();
        });

      return observableFromPromise(refreshToken);
    } else {
      return fn();
    }
  }

}
