import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome!: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  urlApi = 'https://finance-api.up.railway.app/pessoas';

  constructor(private http: HttpClient) {}

  async listar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return await this.http.get(this.urlApi, { params }).toPromise();
  }

  async listarTodas(): Promise<any> {
    return await this.http.get(this.urlApi).toPromise();
  }

  async delete(codigo: number): Promise<any> {
    return await this.http.delete(`${this.urlApi}/${codigo}`).toPromise();
  }
}
