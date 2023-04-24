import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'https://finance-api.up.railway.app/login';

  constructor(private http: HttpClient) { }

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    const body = {"email":usuario, "senha":senha}
    try {
      const token = await this.http.post(this.loginUrl, body, { headers })
        .toPromise();
      console.log(token);
    } catch (response_1) {
      console.log(response_1);
    }
  }
}
