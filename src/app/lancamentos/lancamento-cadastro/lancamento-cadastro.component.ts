import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss'],
})
export class LancamentoCadastroComponent implements OnInit {
  categorias = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];
  constructor(
    private service: CategoriaService,
    private handler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  async carregarCategorias() {
    return await this.service
      .listar()
      .then((categorias) => {
        console.log(categorias['content']);
        this.categorias = categorias['content'].map((c: any) => ({
          label: c.nome,
          value: c.id
        }));
        console.log(this.categorias);
      })
      .catch((erro) => this.handler.handleError(erro));
  }
}
