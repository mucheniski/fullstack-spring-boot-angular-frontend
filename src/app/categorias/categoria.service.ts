import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic YWRtaW5AdGVzdGUuY29tOmFkbWlu' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl: string;

  constructor( private http: HttpClient ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl, httpOptions)
      .toPromise();
  }

}
