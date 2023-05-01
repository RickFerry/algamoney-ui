import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos: any = [];
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;

  constructor(private service: LancamentoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    const filtro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }

    this.service.listar(filtro).then((lanc) => {
      console.log(lanc['content']);
      this.lancamentos = lanc['content'];
    });
  }
}
