import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YWRtaW5AdGVzdGUuY29tOmFkbWlu' })
};

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

    pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const params = new URLSearchParams();

      params.set('page', filtro.pagina.toString());
      params.set('size', filtro.itensPorPagina.toString());

      if (filtro.descricao) {
        params.set('descricao', filtro.descricao);
      }

      if (filtro.dataVencimentoDe) {
        params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
      }

      if (filtro.dataVencimentoAte) {
        params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
      }

      return this.http.get(`${this.lancamentosUrl}?resumo&${params}`, httpOptions)
        .toPromise()
        .then(response => response);
    }

}
