import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss']
})
export class PessoasPesquisaComponent implements OnInit{

  pessoas: any = [];

  constructor(private service: PessoaService){}

  ngOnInit(): void {
    this.service.listar().subscribe(pes => {
      if (pes) {
        console.log(pes)
        this.pessoas = pes;
      }
    })
  }
}
