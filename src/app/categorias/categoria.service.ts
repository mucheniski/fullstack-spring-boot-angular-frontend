import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

}
