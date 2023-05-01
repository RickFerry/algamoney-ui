import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  urlApi = 'https://finance-api.up.railway.app/pessoas'

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]>{
    return this.http.get<any[]>(this.urlApi);
  }
}
