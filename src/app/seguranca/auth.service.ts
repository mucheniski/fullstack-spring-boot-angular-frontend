import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='}), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, httpOptions)
          .toPromise()
          .then( response => {
            this.armazenarToken(response.access_token);
          })
          .catch(response => {
            if (response.status === 400) {
              if (response.error.error === 'invalid_grant') {
                return Promise.reject('Usuario ou senha inválidos!');
              }
            }
            return Promise.reject(response);
          });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  // return Boolean
  tokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  refreshToken(): Promise<void> {

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, httpOptions)
            .toPromise()
            .then(response => {
              this.armazenarToken(response.access_token);
              console.log('Access Token!');
              return Promise.resolve(null);
            })
            .catch(response =>{
              console.log('Erro ao renovar token: ' + response);
              return Promise.resolve(null);
            });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

}
