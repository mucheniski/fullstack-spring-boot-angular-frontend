import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from './pessoa';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==' })
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

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

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

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`, httpOptions)
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });
  }

  salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), httpOptions)
      .toPromise()
      .then(response => response);
  }

  atualizar(pessoa: Pessoa): Promise<any> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), httpOptions)
      .toPromise()
      .then(response => {
        const pessoaAtualizada = response as Pessoa;
        return pessoaAtualizada;
      });
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
