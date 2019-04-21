import { Injectable } from '@angular/core';

import { InterceptaHttp } from './intercepta-http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: InterceptaHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `http://localhost:8080/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
