import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss'],
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistro = 0;
  filtro = new PessoaFiltro();
  pessoas: any = [];

  constructor(private service: PessoaService) {}

  ngOnInit(): void {}

  listar(pagina = 0) {
    this.service.listar(this.filtro).then((pes) => {
      console.log(pes)
      this.totalRegistro = pes.totalElements;
      console.log(this.totalRegistro);
      this.pessoas = pes['content'];
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first! / event.rows!;
    this.listar(pagina);
  }
}
