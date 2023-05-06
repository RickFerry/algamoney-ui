import { PessoaService } from './../../pessoas/pessoa.service';
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
  pessoas = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private handler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  async listar() {
    return await this.pessoaService
      .listarTodas()
      .then((pessoa) => {
        this.pessoas = pessoa['content'].map((p: any) => ({
          label: p.nome,
          value: p.id,
        }));
      })
      .catch((erro) => this.handler.handleError(erro));
  }

  async carregarCategorias() {
    return await this.categoriaService
      .listar()
      .then((categorias) => {
        console.log(categorias['content']);
        this.categorias = categorias['content'].map((c: any) => ({
          label: c.nome,
          value: c.id,
        }));
        console.log(this.categorias);
      })
      .catch((erro) => this.handler.handleError(erro));
  }
}
