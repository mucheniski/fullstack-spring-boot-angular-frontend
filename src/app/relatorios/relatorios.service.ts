import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';

import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/pdf', Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==' }),
  params: {  },
  responseType: 'blob' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    httpOptions.params = new HttpParams()
          .append('inicio', moment(inicio).format('YYYY-MM-DD'))
          .append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, httpOptions )
            .toPromise();
  }

}
