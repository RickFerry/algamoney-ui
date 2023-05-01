import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  urlApi = 'https://finance-api.up.railway.app/lancamentos';

  constructor(private http: HttpClient) {}

  async listar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params.set(
        'dataVencimento',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }
    if (filtro.dataVencimentoFim) {
      params.set(
        'dataPagamento',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }
    const resp = await this.http.get(this.urlApi, { params }).toPromise();
    return resp;
  }
}
