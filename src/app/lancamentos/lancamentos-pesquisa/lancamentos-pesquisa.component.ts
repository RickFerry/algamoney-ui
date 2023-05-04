import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

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

  constructor(
    private service: LancamentoService,
    private confirmService: ConfirmationService,
    private msgService: MessageService
  ) {}

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

  delete(lancamento: any) {
    this.confirmService.confirm({
      message: `Deseja realmente excluir o lancamento: ${lancamento.nome}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.service.delete(lancamento.id).then(() => {
          if (this.gride.first === 0) {
            this.listar();
          } else {
            this.gride.first = 0;
          }
          this.msgService.add({ severity: 'info', summary: 'Confirmed', detail: 'Sucesso!' });
        });
      },
    });
  }
}
