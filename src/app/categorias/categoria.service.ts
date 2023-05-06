import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  urlApi = 'https://finance-api.up.railway.app/categorias';

  constructor(private http: HttpClient) {}

  async listar(): Promise<any> {
    return await this.http.get<any[]>(this.urlApi).toPromise();
  }
}
