import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { Lancamento } from './lancamento';

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

    salvar(lancamento: Lancamento): Promise<any> {
      return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), httpOptions)
        .toPromise()
        .then(response => response);
    }

    atualizar(lancamento: Lancamento): Promise<any> {
      return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), httpOptions)
        .toPromise()
        .then(response => {
          const lancamentoAtualizado = response as Lancamento;
          this.converterStringsParaDatas([lancamentoAtualizado]);
          return lancamentoAtualizado;
        });
    }

    buscarPorCodigo(codigo: number): Promise<any> {
      return this.http.get(`${this.lancamentosUrl}/${codigo}`, httpOptions)
        .toPromise()
        .then(response => {
          const lancamento = response as Lancamento;
          this.converterStringsParaDatas([lancamento]);
          return lancamento;
        });
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.lancamentosUrl}/${codigo}`, httpOptions)
        .toPromise()
        .then(() => null);
    }

    private converterStringsParaDatas(lancamentos: Lancamento[]) {
      for (const lancamento of lancamentos) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
        }
      }
    }

}
