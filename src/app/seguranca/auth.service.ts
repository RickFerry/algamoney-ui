import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'https://finance-api.up.railway.app/login';
  jwtPayload: any

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService
    ) { }

  async login(usuario: string, senha: string): Promise<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    const body = {"email":usuario, "senha":senha}
    try {
      return this.http.post(this.loginUrl, body, { headers })
      .subscribe((resp: any) => {
        console.log(resp['token'])
        this.armazenaToken(resp['token'])
        console.log(this.jwtPayload)
      })
    } catch (response) {
      console.log(response);
    }
  }

  private armazenaToken(token: string){
    this.jwtPayload = this.jwt.decodeToken(token)
  }
}
