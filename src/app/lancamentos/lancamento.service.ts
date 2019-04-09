import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YWRtaW5AdGVzdGUuY29tOmFkbWlu' })
};

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

    pesquisar(): Promise<any> {
      return this.http.get(`${this.lancamentosUrl}?resumo`, httpOptions)
        .toPromise()
        .then(response => response);
    }

}
