import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from './pessoa';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YWRtaW5AdGVzdGUuY29tOmFkbWlu' })
};

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl, httpOptions)
      .toPromise()
      .then(response => response.content);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?${params}`, httpOptions)
      .toPromise()
      .then(response => response);
  }

  salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), httpOptions)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, httpOptions)
      .toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, novoStatus: boolean): Promise<void> {

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus, httpOptions)
    .toPromise()
    .then(() => null);
  }

}
