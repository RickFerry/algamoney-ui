import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { every } from 'rxjs';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistro = 0;
  lancamentos: any = [];
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') gride: any;

  constructor(private service: LancamentoService, private configService: ConfirmationService) {}

  ngOnInit(): void {}

  listar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.listar(this.filtro).then((lanc) => {
      console.log(lanc);
      this.totalRegistro = lanc.totalElements;
      console.log(this.totalRegistro);
      this.lancamentos = lanc['content'];
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first! / event.rows!;
    this.listar(pagina);
  }

  delete(lancamento: any){
    this.configService.confirm({
      message: `Deseja realmente excluir o lancamento: ${lancamento.nome}?`,
      accept: () => {
        this.service.delete(lancamento.id).then(() => {
          if (this.gride.first === 0) {
            this.listar();
          }else{
            this.gride.first = 0;
          }
        })
      }
    })
  }
}
