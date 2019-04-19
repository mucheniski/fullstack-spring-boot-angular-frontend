import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==' })
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
  ) { }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, httpOptions)
          .toPromise()
          .then( response => {
            this.armazenarToken(response);
          })
          .catch(response => {
            console.log(response);
          });
  }

  private armazenarToken(response: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(response.access_token);
  }

}
