import { Lancamento } from 'src/app/models/modelos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  urlApi = 'https://finance-api.up.railway.app/lancamentos';

  constructor(private http: HttpClient) {}

  async listar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'dataVencimento',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }
    if (filtro.dataVencimentoFim) {
      params = params.set(
        'dataPagamento',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }
    return await this.http.get(this.urlApi, { params }).toPromise();
  }

  async delete(codigo: number): Promise<any> {
    return await this.http.delete(`${this.urlApi}/${codigo}`).toPromise();
  }

  async adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return await this.http
      .post(this.urlApi, JSON.stringify(lancamento))
      .toPromise()
      .then((resp: any) => JSON.parse(resp));
  }
}
