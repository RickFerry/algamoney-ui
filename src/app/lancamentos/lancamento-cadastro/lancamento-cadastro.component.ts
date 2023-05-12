import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/models/modelos';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss'],
})
export class LancamentoCadastroComponent implements OnInit {
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private msgService: MessageService,
    private handler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.listar();
  }

  async listar() {
    return await this.pessoaService
      .listarTodas()
      .then((pessoa) => {
        console.log(pessoa);
        console.log(pessoa['content']);
        this.pessoas = pessoa['content'].map((p: any) => ({
          label: p.nome,
          value: p.id,
        }));
        console.log(this.pessoas);
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

  salvar(form: NgForm) {
    this.lancamentoService
      .adicionar(this.lancamento)
      .then(() => {
        this.msgService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Sucesso!',
        });
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch((erro) => this.handler.handleError(erro));
  }
}
