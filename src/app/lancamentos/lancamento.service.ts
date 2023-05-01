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

    params = params.set('page', filtro.pagina)
    params = params.set('size', filtro.itensPorPagina)

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
    const resp = await this.http.get(this.urlApi, { params }).toPromise();
    return resp;
  }
}
