import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss'],
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistro = 0;
  filtro = new PessoaFiltro();
  pessoas: any = [];
  @ViewChild('tabela') gride: any;

  constructor(
    private service: PessoaService,
    private confirmService: ConfirmationService,
    private msgService: MessageService,
    private error: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  listar(pagina = 0) {
    this.service.listar(this.filtro).then((pes) => {
      console.log(pes);
      this.totalRegistro = pes.totalElements;
      console.log(this.totalRegistro);
      this.pessoas = pes['content'];
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first! / event.rows!;
    this.listar(pagina);
  }

  delete(pessoa: any) {
    this.confirmService.confirm({
      message: `Deseja realmente excluir está peesoa: ${pessoa.nome}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.service
          .delete(pessoa.id)
          .then(() => {
            if (this.gride.first === 0) {
              this.listar();
            } else {
              this.gride.first = 0;
            }
            this.msgService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Sucesso!',
            });
          })
          .catch((erro) => this.error.handleError(erro));
      },
    });
  }
}
