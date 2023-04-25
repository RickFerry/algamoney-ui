import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'https://finance-api.up.railway.app/login';

  constructor(private http: HttpClient) { }

  async login(usuario: string, senha: string): Promise<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    const body = {"email":usuario, "senha":senha}
    try {
      return this.http.post(this.loginUrl, body, { headers })
      .subscribe((resp: any) => {
        console.log(resp['token'])
        resp['token']})
    } catch (response) {
      console.log(response);
    }
  }
}
